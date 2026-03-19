export default function ImpressumPage() {
  return (
    <div className="pt-8">
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Impressum</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 prose prose-gray">
          <h2 className="text-2xl font-bold text-primary mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="text-text mb-4">
            <strong>Mizo Autohaus</strong><br />
            Carmove Logistik<br />
            Vahrenwalder Str. 35<br />
            30165 Hannover
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Kontakt</h3>
          <p className="text-text mb-4">
            Telefon: 0151 618 618 08<br />
            Festnetz: 0511 374 36 01<br />
            E-Mail: info@mizo-autohaus.de
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Umsatzsteuer-ID</h3>
          <p className="text-text mb-4">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            [wird nachgetragen]
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">EU-Streitschlichtung</h3>
          <p className="text-text mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-8 mb-3">Verbraucherstreitbeilegung</h3>
          <p className="text-text">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </section>
    </div>
  )
}
