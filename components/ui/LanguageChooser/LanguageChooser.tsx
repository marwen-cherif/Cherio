'use client';

import React, { FC } from 'react';
import { Dropdown } from 'flowbite-react';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import Skeleton from 'react-loading-skeleton';
import { useTranslations, useLocale } from 'next-intl';

export const LanguageChooser: FC = () => {
  const { isFetching, currentUser, handleSetLocale } = useCurrentUser();

  const t = useTranslations('language');

  const SUPPORTED_LOCALES = ['EN', 'FR'];

  if (isFetching) {
    return <Skeleton height="35rem" />;
  }

  return (
    <>
      {currentUser && (
        <Dropdown
          label={t(currentUser.locale.toUpperCase())}
          dismissOnClick={false}
          className="size-sm"
          fullSized
          size="xs"
          color="light"
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <Dropdown.Item
              key={locale}
              onClick={() => handleSetLocale({ locale })}
            >
              {t(locale.toUpperCase())}
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
    </>
  );
};
