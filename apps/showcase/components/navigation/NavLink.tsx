'use client';

import { Link } from '@/i18n/routing';

interface NavLinkProps {
  href: string;
  pathname: string;
  label: string;
}

export function NavLink({ href, pathname, label }: NavLinkProps) {
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-secondary ${
        isActive ? 'text-primary font-medium' : 'text-secondary'
      }`}
    >
      {label}
    </Link>
  );
}

