import { Client, LibraryResponse, SendEmailV3_1 } from 'node-mailjet';

const mailjet = new Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC as string,
  apiSecret: process.env.MJ_APIKEY_PRIVATE as string,
});

export async function sendVerificationRequest({
  identifier: email,
  url,
}: {
  identifier: string;
  url: string;
}) {
  console.log('sending mail');

  const data: SendEmailV3_1.Body = {
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

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
    .post('send', { version: 'v3.1' })
    .request(data);

  const { Status } = result.body.Messages[0];

  if (Status === 'error') {
    throw new Error(JSON.stringify(result.response));
  }
}
