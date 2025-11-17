import { escapeHtml } from '../../utils/emailUtils';
import { getBaseEmailTemplate } from './baseTemplate';

interface ConfirmationEmailData {
  name: string;
  subject: string;
  locale?: 'fr' | 'en';
}

/**
 * Generate confirmation email template
 */
export const getConfirmationEmailTemplate = (data: ConfirmationEmailData): { html: string; text: string } => {
  const { name, subject, locale = 'fr' } = data;
  const isFr = locale === 'fr';

  // Escape all user input
  const escapedName = escapeHtml(name);
  const escapedSubject = escapeHtml(subject);

  const content = `
    <div style="color: #333333; text-align: center;">
      <div style="margin-bottom: 32px;">
        <div style="width: 64px; height: 64px; background-color: #1a1a1a; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
          ✓
        </div>
        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600; line-height: 1.3;">
          ${isFr ? 'Message reçu !' : 'Message received!'}
        </h2>
        <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.5;">
          ${isFr 
            ? `Bonjour <strong>${escapedName}</strong>,` 
            : `Hello <strong>${escapedName}</strong>,`}
        </p>
      </div>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: left;">
        <p style="margin: 0 0 16px; color: #333333; font-size: 15px; line-height: 1.6;">
          ${isFr 
            ? `Nous avons bien reçu votre message concernant <strong>"${escapedSubject}"</strong>.` 
            : `We have received your message regarding <strong>"${escapedSubject}"</strong>.`}
        </p>
        <p style="margin: 0; color: #666666; font-size: 15px; line-height: 1.6;">
          ${isFr 
            ? 'Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais.' 
            : 'Our team will review your request and get back to you as soon as possible.'}
        </p>
      </div>
      
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 16px; color: #666666; font-size: 14px; line-height: 1.6;">
          ${isFr 
            ? 'En attendant, n\'hésitez pas à explorer notre écosystème d\'applications.' 
            : 'In the meantime, feel free to explore our application ecosystem.'}
        </p>
        <a href="https://cherio.me" 
           style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 14px; font-weight: 600; margin-top: 8px;">
          ${isFr ? 'Visiter Cherio' : 'Visit Cherio'}
        </a>
      </div>
      
      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e5e5; text-align: left;">
        <p style="margin: 0 0 8px; color: #333333; font-size: 14px; font-weight: 600;">
          ${isFr ? 'Cordialement,' : 'Best regards,'}
        </p>
        <p style="margin: 0; color: #666666; font-size: 14px;">
          ${isFr ? 'L\'équipe Cherio' : 'The Cherio Team'}
        </p>
      </div>
    </div>
  `;

  const html = getBaseEmailTemplate(content, locale);

  // Plain text version
  const text = `
${isFr ? 'Confirmation de réception - Cherio' : 'Confirmation of receipt - Cherio'}

${isFr ? 'Bonjour' : 'Hello'} ${name},

${isFr 
  ? `Nous avons bien reçu votre message concernant "${subject}".` 
  : `We have received your message regarding "${subject}".`}

${isFr 
  ? 'Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais.' 
  : 'Our team will review your request and get back to you as soon as possible.'}

${isFr 
  ? 'En attendant, n\'hésitez pas à explorer notre écosystème d\'applications : https://cherio.me' 
  : 'In the meantime, feel free to explore our application ecosystem: https://cherio.me'}

${isFr ? 'Cordialement,' : 'Best regards,'}
${isFr ? 'L\'équipe Cherio' : 'The Cherio Team'}
  `.trim();

  return { html, text };
};

