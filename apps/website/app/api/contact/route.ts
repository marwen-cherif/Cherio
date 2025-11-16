import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || '',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Vérifier que les clés API sont configurées
    if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
      console.error('Mailjet API keys are not configured');
      return NextResponse.json(
        { error: 'Configuration du serveur manquante' },
        { status: 500 }
      );
    }

    // Vérifier que l'email de destination est configuré
    const recipientEmail = process.env.MJ_RECIPIENT_EMAIL || process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error('Recipient email is not configured');
      return NextResponse.json(
        { error: 'Configuration du serveur manquante' },
        { status: 500 }
      );
    }

    // Préparer le contenu de l'email
    const emailContent = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Envoyer l'email via Mailjet
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_FROM_EMAIL || recipientEmail,
            Name: process.env.MJ_FROM_NAME || 'Cherio Contact Form',
          },
          To: [
            {
              Email: recipientEmail,
              Name: process.env.MJ_RECIPIENT_NAME || 'Cherio',
            },
          ],
          Subject: `Contact: ${subject}`,
          HTMLPart: emailContent,
          TextPart: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
          ReplyTo: {
            Email: email,
            Name: name,
          },
        },
      ],
    });

    return NextResponse.json(
      { success: true, message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}

