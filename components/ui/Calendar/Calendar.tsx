'use client';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useLocale } from 'next-intl';
import { CalendarOptions } from '@fullcalendar/core';

export default function Calendar({ ...props }: CalendarOptions) {
  const locale = useLocale();

  return (
    <FullCalendar
      {...props}
      locale={locale}
      plugins={[timeGridPlugin]}
      initialView="timeGridDay"
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: '',
      }}
      views={{
        timeGridDay: {
          duration: { days: 4 },
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
        },
      }}
    />
  );
}
