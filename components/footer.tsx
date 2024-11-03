import CustomLink from './custom-link';

export default function Footer() {
  return (
    <footer className="mx-0 my-4 flex w-full flex-col gap-4 text-sm items-center">
      <div className="flex items-center justify-start gap-1">
        Besoin d'aide ?
        <CustomLink href="mailto:reply.cherio@gmail.com">
          Contactez le support
        </CustomLink>
        |
        <CustomLink href="/privacy-policy">
          Politique de confidentialité
        </CustomLink>
        |
        <CustomLink href="/terms-of-service">
          Conditions d'utilisation
        </CustomLink>
      </div>
      <div className="flex-auto">© 2024 Cherio. All rights reserved.</div>
    </footer>
  );
}
