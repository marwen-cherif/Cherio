'use client';

import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Service } from '../../../../../lib/ApiClient/Service';
import { Banner, Button, ToggleSwitch } from 'flowbite-react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { Input } from '../../../../../components/ui/Input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { tenantCreationSchema } from './TenantCreation.schema';
import { Form } from '../../../../../components/ui/Form/Form';

export const TenantCreation: FC = () => {
  const appTranslations = useTranslations('App');
  const t = useTranslations('Tenant.Initialize');
  const formContext = useForm<{
    name: string;
    isOwner: boolean;
  }>({
    mode: 'onChange',
    resolver: yupResolver(tenantCreationSchema),
  });

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formContext;

  const isOwner = watch('isOwner');

  const submitInitializeTenant = handleSubmit(async ({ name }) => {
    const tenant = await Service.initializeTenant({
      name,
    });

    if (tenant) {
      redirect('/');
    }
  });

  return (
    <Form onSubmit={submitInitializeTenant}>
      <div className="mb-4">
        <Controller
          control={formContext.control}
          render={({ field }) => (
            <ToggleSwitch
              checked={field.value}
              label={t('isOwner')}
              onChange={field.onChange}
            />
          )}
          name="isOwner"
        />
      </div>

      {isOwner && (
        <div className="mb-4">
          <Input
            label={t('tenantName')}
            isRequired
            disabled={!isOwner}
            {...formContext.register('name')}
            errors={errors}
          />
        </div>
      )}

      {!isOwner && (
        <Banner className="mb-4">
          <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                {t('actionByOwnerTitle')}
              </h2>
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                {t('youNeedToBeOwner')}
              </p>{' '}
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                {t('ownerWillAddYou')}
              </p>
            </div>
          </div>
        </Banner>
      )}

      <div className="flex justify-end">
        <Button
          color="dark"
          type="submit"
          disabled={!isOwner}
          isProcessing={isSubmitting}
        >
          {appTranslations('submit')}
        </Button>
      </div>
    </Form>
  );
};
