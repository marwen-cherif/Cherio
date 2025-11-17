/**
 * Base email template with modern, responsive design
 */
export const getBaseEmailTemplate = (content: string, locale: 'fr' | 'en' = 'fr'): string => {
  const isFr = locale === 'fr';
  
  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Cherio</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Cherio
              </h1>
              <p style="margin: 8px 0 0; color: #e0e0e0; font-size: 14px; font-weight: 400;">
                ${isFr ? 'Écosystème d\'applications' : 'Application Ecosystem'}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e5e5;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; color: #666666; font-size: 12px; line-height: 1.6;">
                    <p style="margin: 0 0 8px;">
                      <strong>Cherio</strong> - ${isFr ? 'Écosystème d\'applications pour la création, le commerce et l\'innovation' : 'Application ecosystem for creation, commerce, and innovation'}
                    </p>
                    <p style="margin: 8px 0 0; color: #999999;">
                      © ${new Date().getFullYear()} Cherio. ${isFr ? 'Tous droits réservés' : 'All rights reserved'}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

