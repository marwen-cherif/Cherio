export default function TermsOfService() {
  return (
    <div className="container mx-auto px-6 py-8 text-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Conditions d'utilisation de Cherio
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Dernière mise à jour : [Date]
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          1. Acceptation des conditions
        </h2>
        <p className="mb-4">
          En utilisant l'application Cherio, vous acceptez les présentes
          conditions d'utilisation. Si vous n'acceptez pas ces conditions,
          veuillez ne pas utiliser nos services.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          2. Utilisation des services
        </h2>
        <p className="mb-4">
          Nos services sont destinés à un usage personnel et non commercial.
          Toute utilisation abusive ou illégale est strictement interdite.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Compte et sécurité</h2>
        <p className="mb-4">
          Vous êtes responsable de la confidentialité de votre compte et de
          toutes les activités qui y sont associées. Informez-nous immédiatement
          de toute utilisation non autorisée de votre compte.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          4. Propriété intellectuelle
        </h2>
        <p className="mb-4">
          Tous les contenus de Cherio, y compris les textes, graphiques, logos,
          et logiciels, sont protégés par des droits d'auteur et autres lois de
          propriété intellectuelle. Vous ne pouvez pas les utiliser sans notre
          autorisation préalable.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          5. Limitation de responsabilité
        </h2>
        <p className="mb-4">
          Cherio ne saurait être tenu responsable des dommages indirects,
          spéciaux ou consécutifs résultant de l'utilisation ou de l'incapacité
          à utiliser nos services.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          6. Modification des conditions
        </h2>
        <p className="mb-4">
          Nous nous réservons le droit de modifier ces conditions d'utilisation
          à tout moment. En continuant d'utiliser Cherio après toute
          modification, vous acceptez les nouvelles conditions.
        </p>

        <p className="mt-6 text-gray-500">
          Pour toute question, veuillez nous contacter à{' '}
          <a
            href="mailto:reply.cherio@gmail.com"
            className="text-blue-600 hover:text-blue-800"
          >
            reply.cherio@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
