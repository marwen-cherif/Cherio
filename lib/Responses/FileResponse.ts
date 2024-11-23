export const buildPdfFileResponse = ({
  file,
  name,
}: {
  file: Buffer;
  name: string;
}) => {
  return new Response(file, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${name}";`,
    },
  });
};
