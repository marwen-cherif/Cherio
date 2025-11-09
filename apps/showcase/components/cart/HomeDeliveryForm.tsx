'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryAddress } from '@shared/index';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { Card } from '@/components/ui/Card';
import { useClientStore } from '@/stores/clientStore';
import { useIsRTL, useLocale } from '@/hooks/useLocale';
import { homeDeliveryFormSchema, type HomeDeliveryFormData } from './HomeDeliveryForm.schema';
import { useTranslations } from 'next-intl';
import { Select, type SelectOption } from '@/components/ui/Select';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { countries, findCountryByValue, getCountryLabel } from '@/utils/countries';

interface HomeDeliveryFormProps {
  initialData?: DeliveryAddress;
  onSave: (data: DeliveryAddress) => void;
  onCancel: () => void;
  initialIsOpen?: boolean;
}

export default function HomeDeliveryForm({
  initialData,
  onSave,
  onCancel,
  initialIsOpen = true,
}: HomeDeliveryFormProps) {
  const t = useTranslations('cart');
  // Get isRTL and locale from store
  const isRTL = useIsRTL();
  const { locale } = useLocale();

  // Get delivery address from store
  const storeDeliveryAddress = useClientStore((state) => state.deliveryAddress);
  const setDeliveryAddress = useClientStore((state) => state.setDeliveryAddress);

  // Use store data if available, otherwise use initialData prop
  const savedData = storeDeliveryAddress || initialData;

  // Determine initial open state: if we have saved data, start collapsed
  const cardInitialIsOpen = savedData ? false : initialIsOpen;

  // Prepare country options with localized labels
  const countryOptions: SelectOption[] = countries.map((country) => ({
    value: country.value,
    label: getCountryLabel(country, locale),
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<HomeDeliveryFormData>({
    resolver: zodResolver(homeDeliveryFormSchema),
    defaultValues: {
      firstName: savedData?.firstName || '',
      lastName: savedData?.lastName || '',
      addressLine1: savedData?.addressLine1 || '',
      addressLine2: savedData?.addressLine2 || '',
      city: savedData?.city || '',
      postalCode: savedData?.postalCode || '',
      country: savedData?.country || 'FR',
      department: savedData?.department || '',
      phone: savedData?.phone || '',
      additionalInfo: savedData?.additionalInfo || '',
    },
  });

  // // Update form data when savedData changes
  // useEffect(() => {
  //   if (savedData) {
  //     reset({
  //       firstName: savedData.firstName || '',
  //       lastName: savedData.lastName || '',
  //       addressLine1: savedData.addressLine1 || '',
  //       addressLine2: savedData.addressLine2 || '',
  //       city: savedData.city || '',
  //       postalCode: savedData.postalCode || '',
  //       country: savedData.country || '',
  //       department: savedData.department || '',
  //       phone: savedData.phone || '',
  //       additionalInfo: savedData.additionalInfo || '',
  //     });
  //   }
  // }, [savedData, reset]);

  const onSubmit = (data: HomeDeliveryFormData) => {
    // Save to Zustand store
    setDeliveryAddress(data);
    // Also call the onSave callback for backward compatibility
    onSave(data);
  };

  // Summary content to show when collapsed
  const summaryContent = savedData ? (
    <>
      <p>
        <span className="font-medium text-primary">
          {savedData.firstName} {savedData.lastName}
        </span>
      </p>
      <p>{savedData.addressLine1}</p>
      {savedData.addressLine2 && <p>{savedData.addressLine2}</p>}
      <p>
        {savedData.postalCode} {savedData.city}
        {savedData.department && `, ${savedData.department}`}
      </p>
      <p>
        {savedData.country
          ? getCountryLabel(findCountryByValue(savedData.country) || countries[0], locale)
          : savedData.country}
      </p>
      {savedData.phone && <p className="text-sm text-secondary">{savedData.phone}</p>}
      {savedData.additionalInfo && (
        <p className="mt-2 text-sm italic">{savedData.additionalInfo}</p>
      )}
    </>
  ) : undefined;

  return (
    <Card
      title={t('deliveryInfo')}
      initialIsOpen={cardInitialIsOpen}
      summary={summaryContent}
      editLabel={t('editDeliveryInfo')}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.firstName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className={`w-full rounded-md border ${
                errors.firstName ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.lastName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className={`w-full rounded-md border ${
                errors.lastName ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="addressLine1" className="block text-sm font-medium text-primary mb-1">
            {t('deliveryForm.addressLine1')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="addressLine1"
            {...register('addressLine1')}
            className={`w-full rounded-md border ${
              errors.addressLine1 ? 'border-red-500' : 'border-border'
            } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="addressLine2" className="block text-sm font-medium text-primary mb-1">
            {t('deliveryForm.addressLine2')}
          </label>
          <input
            type="text"
            id="addressLine2"
            {...register('addressLine2')}
            className="w-full rounded-md border border-border px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.city')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className={`w-full rounded-md border ${
                errors.city ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.postalCode')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              {...register('postalCode')}
              className={`w-full rounded-md border ${
                errors.postalCode ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.country')} <span className="text-red-500">*</span>
            </label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <Select
                  options={countryOptions}
                  placeholder={t('deliveryForm.country')}
                  isSearchable
                  error={!!errors.country}
                  value={countryOptions.find((option) => option.value === field.value) || null}
                  onChange={(option) => field.onChange(option?.value || '')}
                />
              )}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-primary mb-1">
              {t('deliveryForm.department')}
            </label>
            <input
              type="text"
              id="department"
              {...register('department')}
              className="w-full rounded-md border border-border px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
            {t('deliveryForm.phone')}
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                defaultCountry="FR"
                international
                error={!!errors.phone}
              />
            )}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-primary mb-1">
            {t('deliveryForm.additionalInfo')}
          </label>
          <textarea
            id="additionalInfo"
            {...register('additionalInfo')}
            rows={3}
            className="w-full rounded-md border border-border px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size={ButtonSize.Normal}
            onClick={onCancel}
            isRTL={isRTL}
          >
            {t('chooseAnotherDeliveryMethod')}
          </Button>
          <Button type="submit" variant="primary" size={ButtonSize.Normal} isRTL={isRTL}>
            {t('saveDeliveryInfo')}
          </Button>
        </div>
      </form>
    </Card>
  );
}
