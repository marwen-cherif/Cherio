import { getRequestConfig } from 'next-intl/server';
import { auth } from 'auth';
import { cookies } from 'next/headers';
import * as jwt from 'next-auth/jwt';
import { prisma } from '../prisma/prisma';

const secret = process.env.JWT_SECRET;

export default getRequestConfig(async () => {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    return {
      locale: 'EN',
      messages: (await import(`./messages/EN.json`)).default,
    };
  }

  const { locale } = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
    select: {
      locale: true,
    },
  });

  console.log('locale', locale);

  const defaultLocale = 'EN';

  return {
    locale: locale?.toUpperCase() ?? defaultLocale,
    messages: (
      await import(`./messages/${locale.toUpperCase() ?? defaultLocale}.json`)
    ).default,
  };
});
