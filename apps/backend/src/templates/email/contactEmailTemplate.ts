import { escapeHtml, nl2br } from '../../utils/emailUtils';
import { getBaseEmailTemplate } from './baseTemplate';

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: 'fr' | 'en';
}

/**
 * Generate contact form email template
 */
export const getContactEmailTemplate = (data: ContactEmailData): { html: string; text: string } => {
  const { name, email, subject, message, locale = 'fr' } = data;
  const isFr = locale === 'fr';

  // Escape all user input
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = nl2br(escapeHtml(message));

  const content = `
    <div style="color: #333333;">
      <h2 style="margin: 0 0 24px; color: #1a1a1a; font-size: 24px; font-weight: 600; line-height: 1.3;">
        ${isFr ? '📧 Nouveau message de contact' : '📧 New contact message'}
      </h2>
      
      <div style="background-color: #f9f9f9; border-left: 4px solid #1a1a1a; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #1a1a1a; font-size: 14px; display: inline-block; min-width: 80px;">
                ${isFr ? 'Nom' : 'Name'}:
              </strong>
              <span style="color: #333333; font-size: 14px;">${escapedName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #1a1a1a; font-size: 14px; display: inline-block; min-width: 80px;">
                ${isFr ? 'Email' : 'Email'}:
              </strong>
              <a href="mailto:${escapedEmail}" style="color: #1a1a1a; text-decoration: none; font-size: 14px; border-bottom: 1px solid #1a1a1a;">
                ${escapedEmail}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #1a1a1a; font-size: 14px; display: inline-block; min-width: 80px;">
                ${isFr ? 'Sujet' : 'Subject'}:
              </strong>
              <span style="color: #333333; font-size: 14px;">${escapedSubject}</span>
            </td>
          </tr>
        </table>
      </div>
      
      <div style="margin: 24px 0;">
        <h3 style="margin: 0 0 12px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
          ${isFr ? 'Message' : 'Message'}:
        </h3>
        <div style="background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 4px; padding: 16px; color: #333333; font-size: 14px; line-height: 1.6;">
          ${escapedMessage}
        </div>
      </div>
      
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
        <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(escapedSubject)}" 
           style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 14px; font-weight: 600; text-align: center;">
          ${isFr ? 'Répondre' : 'Reply'}
        </a>
      </div>
    </div>
  `;

  const html = getBaseEmailTemplate(content, locale);

  // Plain text version
  const text = `
${isFr ? 'Nouveau message de contact' : 'New contact message'}

${isFr ? 'Nom' : 'Name'}: ${name}
${isFr ? 'Email' : 'Email'}: ${email}
${isFr ? 'Sujet' : 'Subject'}: ${subject}

${isFr ? 'Message' : 'Message'}:
${message}

---
${isFr ? 'Pour répondre, utilisez l\'adresse email ci-dessus.' : 'To reply, use the email address above.'}
  `.trim();

  return { html, text };
};

