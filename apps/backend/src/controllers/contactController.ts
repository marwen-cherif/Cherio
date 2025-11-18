import { Request, Response } from 'express';
import Mailjet from 'node-mailjet';
import { getContactEmailTemplate } from '../templates/email/contactEmailTemplate';
import { getConfirmationEmailTemplate } from '../templates/email/confirmationEmailTemplate';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: 'fr' | 'en';
}

/**
 * Get or create Mailjet client instance
 */
const getMailjetClient = () => {
  const apiKey = process.env.MJ_APIKEY_PUBLIC;
  const apiSecret = process.env.MJ_APIKEY_PRIVATE;

  if (!apiKey || !apiSecret) {
    throw new Error(
      'Mailjet API keys are not configured. Please set MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE environment variables.'
    );
  }

  return new Mailjet({
    apiKey,
    apiSecret,
  });
};

/**
 * Send contact form email via Mailjet
 */
export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, locale }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format d'email invalide",
      });
    }

    // Determine locale (from request body, Accept-Language header, or default to 'fr')
    const detectedLocale: 'fr' | 'en' =
      locale || (req.headers['accept-language']?.includes('en') ? 'en' : 'fr');

    // Get recipient email from environment or use default
    const recipientEmail =
      process.env.CONTACT_EMAIL || process.env.MJ_FROM_EMAIL || 'reply.cherio@gmail.com';

    // Get Mailjet client
    const mailjet = getMailjetClient();

    // Generate contact email template
    const contactTemplate = getContactEmailTemplate({
      name,
      email,
      subject,
      message,
      locale: detectedLocale,
    });

    // Send contact email via Mailjet
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_FROM_EMAIL || 'noreply@cherio.me',
            Name: 'Cherio Contact Form',
          },
          To: [
            {
              Email: recipientEmail,
              Name: 'Cherio Team',
            },
          ],
          Subject: `Contact: ${subject}`,
          TextPart: contactTemplate.text,
          HTMLPart: contactTemplate.html,
          ReplyTo: {
            Email: email,
            Name: name,
          },
        },
      ],
    });

    // Send confirmation email to the user
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const confirmationTemplate = getConfirmationEmailTemplate({
        name,
        subject,
        locale: detectedLocale,
      });

      await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: process.env.MJ_FROM_EMAIL || 'noreply@cherio.me',
              Name: 'Cherio',
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject:
              detectedLocale === 'fr'
                ? 'Confirmation de réception - Cherio'
                : 'Confirmation of receipt - Cherio',
            TextPart: confirmationTemplate.text,
            HTMLPart: confirmationTemplate.html,
          },
        ],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: result.body,
    });
  } catch (error: any) {
    console.error('Error sending contact email:', error);

    // Check if it's a configuration error
    if (error.message && error.message.includes('Mailjet API keys')) {
      return res.status(500).json({
        success: false,
        message: "Configuration Mailjet manquante. Veuillez contacter l'administrateur.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
