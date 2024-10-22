const apiKey = process.env.MJ_APIKEY_PUBLIC as string;
const apiSecret = process.env.MJ_APIKEY_PRIVATE as string;
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

export async function sendVerificationRequest({
  identifier: email,
  url,
}: {
  identifier: string;
  url: string;
}) {
  console.log('sending mail');

  const data = {
    Messages: [
      {
        From: {
          Email: 'reply.cherio@gmail.com',
        },
        To: [
          {
            Email: email,
          },
        ],
        TemplateID: 6405913,
        TemplateLanguage: true,
        Subject: 'Please Verify Your Email Address',
        Variables: {
          emailVerificationUrl: url,
        },
      },
    ],
  };

  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status !== 200) {
      throw new Error(JSON.stringify(result));
    }

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}
