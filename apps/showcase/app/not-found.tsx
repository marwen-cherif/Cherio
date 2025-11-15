import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

