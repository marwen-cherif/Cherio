'use client';

import React, { FC, Suspense } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { usePatientDetailsContent } from './PatientDetailsContent.hooks';
import { AddNote } from './AddNote/AddNote';
import Skeleton from 'react-loading-skeleton';
import { PatientNotes } from './PatientNotes/PatientNotes';

export const PatientDetailsContent: FC<{ id: string }> = ({ id }) => {
  const t = useTranslations('Patients.Patient');
  const format = useFormatter();
  const { patient } = usePatientDetailsContent({ id });
  const user = patient.user;

  return (
    <>
      <div className="space-y-2 flex justify-between">
        <h1 className="text-3xl font-bold mb-4">
          {t('title', {
            name: `${user.firstName} ${user.lastName}`,
          })}
        </h1>

        <AddNote />
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4">{t('personalInformation')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-lg font-bold mb-1">{t('firstName')}</div>
              <div>{user.firstName}</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1">{t('lastName')}</div>
              <div>{user.lastName}</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1">{t('email')}</div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1">{t('phone')}</div>
              <div>{user.phone}</div>
            </div>
          </div>

          {user.birthDate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-lg font-bold mb-1">{t('birthDate')}</div>
                <div>
                  {format.dateTime(user.birthDate, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Suspense fallback={<Skeleton height="5rem" />}>
        <PatientNotes patientId={id} />
      </Suspense>
    </>
  );
};
