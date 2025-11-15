interface PageHeaderProps {
  title: string;
  subtitle?: string;
  isRTL: boolean;
}

export function PageHeader({ title, subtitle, isRTL }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}

