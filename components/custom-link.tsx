import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
}

const CustomLink = ({
  href,
  children,
  className,
  target = '_blank',
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink || isAnchorLink) {
    return (
      <Link href={href} className={className} target={target} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 align-baseline underline underline-offset-4',
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <ExternalLink className="ml-0.5 inline-block h-4 w-4" />
    </Link>
  );
};

export default CustomLink;
