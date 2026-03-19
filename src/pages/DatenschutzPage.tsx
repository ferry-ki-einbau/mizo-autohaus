export default function DatenschutzPage() {
  return (
    <div className="pt-8">
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-8 text-text">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Allgemeine Hinweise</h3>
            <p className="text-text-muted leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Verantwortliche Stelle</h2>
            <p className="text-text-muted leading-relaxed">
              <strong className="text-text">Mizo Autohaus</strong><br />
              Carmove Logistik<br />
              Vahrenwalder Str. 35<br />
              30165 Hannover<br />
              Telefon: 0151 618 618 08<br />
              E-Mail: info@mizo-autohaus.de
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Kontaktformular</h3>
            <p className="text-text-muted leading-relaxed">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Server-Log-Dateien</h3>
            <p className="text-text-muted leading-relaxed">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Ihre Rechte</h2>
            <p className="text-text-muted leading-relaxed">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Hosting</h2>
            <p className="text-text-muted leading-relaxed">
              Diese Website wird bei Vercel Inc. gehostet. Details entnehmen Sie der Datenschutzerklärung von Vercel.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Google Maps</h2>
            <p className="text-text-muted leading-relaxed">
              Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited. Beim Aufruf einer Seite mit Google Maps Karte wird eine Verbindung zu den Servern von Google hergestellt. Hierbei kann auch Ihre IP-Adresse an Google übertragen werden.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
