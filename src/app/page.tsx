import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Maak je eigen website in 2 minuten
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Kies uit 17 professionele templates. Vul je details in. Publish. Klaar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Start Gratis
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Inloggen
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-white py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">2,547+</div>
              <div className="text-sm text-gray-600 mt-1">Websites gemaakt</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">1,892+</div>
              <div className="text-sm text-gray-600 mt-1">Gepubliceerd</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">17+</div>
              <div className="text-sm text-gray-600 mt-1">Professionele templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600 mt-1">Minuten tot live</div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Templates voor elk type bedrijf
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Voor restaurants, kappers, bouwbedrijven, webshops, en meer. Elke template is ontworpen door professionals.
          </p>

          {/* Template Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Horeca', count: 2, icon: '🍽️' },
              { name: 'E-commerce', count: 2, icon: '🛒' },
              { name: 'Bouw', count: 2, icon: '🏗️' },
              { name: 'Beauty', count: 2, icon: '💇‍♀️' },
              { name: 'Fitness', count: 2, icon: '🏋️' },
              { name: 'Zakelijk', count: 2, icon: '👔' },
              { name: 'ZZP', count: 2, icon: '🔧' },
              { name: 'Specialisten', count: 3, icon: '🩺' }
            ].map((cat) => (
              <div
                key={cat.name}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.count} templates</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Zo simpel is het
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-6">
                1
              </div>
              <h3 className="font-semibold text-xl mb-3">Kies een template</h3>
              <p className="text-gray-600">
                Selecteer een branche zoals restaurant, kapper, of webshop
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl font-bold text-green-600 mx-auto mb-6">
                2
              </div>
              <h3 className="font-semibold text-xl mb-3">Vul je details</h3>
              <p className="text-gray-600">
                Voeg je bedrijfsnaam, adres, en contactgegevens toe
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600 mx-auto mb-6">
                3
              </div>
              <h3 className="font-semibold text-xl mb-3">Publiceer</h3>
              <p className="text-gray-600">
                Met één klik is je website live en vindbaar via je URL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Alles wat je nodig hebt
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Professionele templates', description: 'Door experts ontworpen templates voor elke industrie' },
              { title: 'In 2 minuten live', description: 'Van registratie tot gepubliceerde website in minder dan 2 minuten' },
              { title: 'Mobiel-vriendelijk', description: 'Alle websites werken perfect op telefoon, tablet en desktop' },
              { title: 'SEO optimalisatie', description: 'Automatische meta-tags en zoekmachine vriendelijke URLs' },
              { title: 'Kolenvrije content', description: 'Nederlandse teksten die je naar wens kunt aanpassen' },
              { title: 'Contactformulier', description: 'Automatisch contactformulier op elke website' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Klaar om je website te maken?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start vandaag nog en publiceer je professionele website in 2 minuten
          </p>
          <Link
            href="/sign-up"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Start Gratis - Maak Website
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Website Builder. Alle rechten voorbehouden.
          </p>
          <div className="mt-4 space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Voorwaarden
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}