'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DeliveryAddress } from '@shared/index';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { useClientStore } from '@/stores/clientStore';

interface HomeDeliveryFormProps {
  translations: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    department: string;
    additionalInfo: string;
    firstNameRequired: string;
    lastNameRequired: string;
    addressLine1Required: string;
    cityRequired: string;
    postalCodeRequired: string;
    countryRequired: string;
    saveDeliveryInfo: string;
    cancel: string;
    chooseAnotherDeliveryMethod: string;
  };
  isRTL: boolean;
  initialData?: DeliveryAddress;
  onSave: (data: DeliveryAddress) => void;
  onCancel: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  editLabel: string;
  deliveryInfoLabel: string;
}

export default function HomeDeliveryForm({
  translations,
  isRTL,
  initialData,
  onSave,
  onCancel,
  isCollapsed,
  onToggleCollapse,
  editLabel,
  deliveryInfoLabel,
}: HomeDeliveryFormProps) {
  // Get delivery address from store
  const storeDeliveryAddress = useClientStore((state) => state.deliveryAddress);
  const setDeliveryAddress = useClientStore((state) => state.setDeliveryAddress);
  
  // Use store data if available, otherwise use initialData prop
  const savedData = storeDeliveryAddress || initialData;
  
  const [formData, setFormData] = useState<DeliveryAddress>({
    firstName: savedData?.firstName || '',
    lastName: savedData?.lastName || '',
    addressLine1: savedData?.addressLine1 || '',
    addressLine2: savedData?.addressLine2 || '',
    city: savedData?.city || '',
    postalCode: savedData?.postalCode || '',
    country: savedData?.country || '',
    department: savedData?.department || '',
    additionalInfo: savedData?.additionalInfo || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});

  // Update form data when savedData changes
  useEffect(() => {
    if (savedData) {
      setFormData({
        firstName: savedData.firstName || '',
        lastName: savedData.lastName || '',
        addressLine1: savedData.addressLine1 || '',
        addressLine2: savedData.addressLine2 || '',
        city: savedData.city || '',
        postalCode: savedData.postalCode || '',
        country: savedData.country || '',
        department: savedData.department || '',
        additionalInfo: savedData.additionalInfo || '',
      });
    }
  }, [savedData]);

  const handleChange = (field: keyof DeliveryAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryAddress, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = translations.firstNameRequired;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = translations.lastNameRequired;
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = translations.addressLine1Required;
    }
    if (!formData.city.trim()) {
      newErrors.city = translations.cityRequired;
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = translations.postalCodeRequired;
    }
    if (!formData.country.trim()) {
      newErrors.country = translations.countryRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save to Zustand store
      setDeliveryAddress(formData);
      // Also call the onSave callback for backward compatibility
      onSave(formData);
    }
  };

  // If collapsed and we have saved data, show summary
  if (isCollapsed && savedData) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="rounded-lg border border-border bg-white p-6 shadow-sm"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">{deliveryInfoLabel}</h3>
          <Button
            variant="secondary"
            size={ButtonSize.Small}
            onClick={onToggleCollapse}
            isRTL={isRTL}
          >
            {editLabel}
          </Button>
        </div>
        <div className="space-y-2 text-secondary">
          <p>
            <span className="font-medium text-primary">{savedData.firstName} {savedData.lastName}</span>
          </p>
          <p>{savedData.addressLine1}</p>
          {savedData.addressLine2 && <p>{savedData.addressLine2}</p>}
          <p>
            {savedData.postalCode} {savedData.city}
            {savedData.department && `, ${savedData.department}`}
          </p>
          <p>{savedData.country}</p>
          {savedData.additionalInfo && (
            <p className="mt-2 text-sm italic">{savedData.additionalInfo}</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg border border-border bg-white p-6 shadow-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h3 className="text-lg font-semibold text-primary mb-4">{deliveryInfoLabel}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1">
              {translations.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full rounded-md border ${
                errors.firstName ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1">
              {translations.lastName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full rounded-md border ${
                errors.lastName ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="addressLine1" className="block text-sm font-medium text-primary mb-1">
            {translations.addressLine1} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="addressLine1"
            value={formData.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            className={`w-full rounded-md border ${
              errors.addressLine1 ? 'border-red-500' : 'border-border'
            } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
          )}
        </div>

        <div>
          <label htmlFor="addressLine2" className="block text-sm font-medium text-primary mb-1">
            {translations.addressLine2}
          </label>
          <input
            type="text"
            id="addressLine2"
            value={formData.addressLine2 || ''}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            className="w-full rounded-md border border-border px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-primary mb-1">
              {translations.city} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full rounded-md border ${
                errors.city ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-primary mb-1">
              {translations.postalCode} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={`w-full rounded-md border ${
                errors.postalCode ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-primary mb-1">
              {translations.country} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full rounded-md border ${
                errors.country ? 'border-red-500' : 'border-border'
              } px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-primary mb-1">
              {translations.department}
            </label>
            <input
              type="text"
              id="department"
              value={formData.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-primary mb-1">
            {translations.additionalInfo}
          </label>
          <textarea
            id="additionalInfo"
            value={formData.additionalInfo || ''}
            onChange={(e) => handleChange('additionalInfo', e.target.value)}
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
            {translations.chooseAnotherDeliveryMethod}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size={ButtonSize.Normal}
            isRTL={isRTL}
          >
            {translations.saveDeliveryInfo}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

