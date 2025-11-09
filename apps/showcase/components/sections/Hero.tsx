interface HeroProps {
  title: string;
  subtitle: string;
  isRTL: boolean;
}

export function Hero({ title, subtitle, isRTL }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/30 to-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-secondary">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

