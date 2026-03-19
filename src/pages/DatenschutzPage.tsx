export default function DatenschutzPage() {
  return (
    <div className="pt-8">
      <section className="py-12 sm:py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-black">Datenschutzerklärung</h1>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-text-muted leading-relaxed space-y-10">

          {/* 1. Überblick */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-base font-bold text-primary mt-4 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Datenerfassung auf dieser Website</h3>
            <p className="font-medium text-primary">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
            <p className="mt-1">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>
            <p className="font-medium text-primary mt-3">Wie erfassen wir Ihre Daten?</p>
            <p className="mt-1">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.&nbsp;B. durch Eingabe in ein Kontaktformular. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            <p className="font-medium text-primary mt-3">Wofür nutzen wir Ihre Daten?</p>
            <p className="mt-1">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            <p className="font-medium text-primary mt-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
            <p className="mt-1">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </div>

          {/* 2. Verantwortliche Stelle */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">2. Verantwortliche Stelle</h2>
            <p>
              <strong className="text-primary">Mizo Autohaus</strong><br />
              Vahrenwalder Straße 35<br />
              30165 Hannover<br /><br />
              Geschäftsführer: Samir El-Zein<br />
              Telefon: 0151 618 618 08<br />
              E-Mail: info@mizo-autohaus.de
            </p>
            <p className="mt-3">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o.&nbsp;Ä.) entscheidet.
            </p>
          </div>

          {/* 3. Speicherdauer */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">3. Speicherdauer</h2>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </div>

          {/* 4. Rechtsgrundlagen */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">4. Allgemeine Hinweise zu den Rechtsgrundlagen</h2>
            <p>
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von <strong className="text-primary">Art. 6 Abs. 1 lit. a DSGVO</strong> bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern die Datenverarbeitung zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen erforderlich ist, verarbeiten wir Ihre Daten auf Grundlage von <strong className="text-primary">Art. 6 Abs. 1 lit. b DSGVO</strong>. Ferner verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von <strong className="text-primary">Art. 6 Abs. 1 lit. c DSGVO</strong>. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach <strong className="text-primary">Art. 6 Abs. 1 lit. f DSGVO</strong> erfolgen.
            </p>
          </div>

          {/* 5. Ihre Rechte */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">5. Ihre Rechte</h2>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Recht auf Auskunft, Berichtigung, Sperrung und Löschung</h3>
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Recht auf Einschränkung der Verarbeitung</h3>
            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn die Richtigkeit der Daten bestritten wird, die Verarbeitung unrechtmäßig ist, wir die Daten nicht mehr benötigen oder Sie Widerspruch eingelegt haben.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde ist:<br /><br />
              Die Landesbeauftragte für den Datenschutz Niedersachsen<br />
              Prinzenstraße 5, 30159 Hannover<br />
              Telefon: 0511 120-4500<br />
              E-Mail: poststelle@lfd.niedersachsen.de
            </p>
          </div>

          {/* 6. Datenerfassung auf der Website */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">6. Datenerfassung auf dieser Website</h2>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Cookies</h3>
            <p>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Wir verwenden folgende Arten von Cookies:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-primary">Notwendige Cookies:</strong> Diese Cookies sind für den Betrieb der Website erforderlich. Hierzu gehört das Speichern Ihrer Cookie-Einstellungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</li>
              <li><strong className="text-primary">Analyse-Cookies:</strong> Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. Sie werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</li>
              <li><strong className="text-primary">Marketing-Cookies:</strong> Diese Cookies werden für personalisierte Werbung verwendet. Sie werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</li>
            </ul>
            <p className="mt-2">
              Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner ändern, der beim ersten Besuch der Website angezeigt wird. Alternativ können Sie Ihren Browser so einstellen, dass er Sie über das Setzen von Cookies informiert, und Cookies nur im Einzelfall erlauben.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Kontakt- und Ankaufformular</h3>
            <p>
              Wenn Sie uns über das Kontaktformular oder das Ankauf-Formular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, Telefon, E-Mail) sowie Fahrzeugdaten (Marke, Modell, Baujahr, Kilometerstand, Zustand, TÜV-Status, Fotos) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von <strong className="text-primary">Art. 6 Abs. 1 lit. b DSGVO</strong> (vorvertragliche Maßnahmen). Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
            </p>

            <h3 className="text-base font-bold text-primary mt-4 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-2">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
            </p>
          </div>

          {/* 7. E-Mail-Versand */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">7. E-Mail-Versand über Resend</h2>
            <p>
              Für den Versand von E-Mails (z.&nbsp;B. Bestätigungen nach Formularversand) nutzen wir den Dienst <strong className="text-primary">Resend</strong> (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Beim Versand werden Ihre E-Mail-Adresse und die im Formular angegebenen Daten an die Server von Resend übermittelt.
            </p>
            <p className="mt-2">
              Die Nutzung von Resend erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem zuverlässigen E-Mail-Versand). Die Datenübermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission.
            </p>
            <p className="mt-2">
              Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline no-underline break-all">https://resend.com/legal/privacy-policy</a>
            </p>
          </div>

          {/* 8. Hosting */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">8. Hosting</h2>
            <p>
              Diese Website wird bei <strong className="text-primary">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten (z.&nbsp;B. IP-Adresse) auf den Servern von Vercel verarbeitet.
            </p>
            <p className="mt-2">
              Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unserer Website). Die Datenübermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission.
            </p>
            <p className="mt-2">
              Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline no-underline break-all">https://vercel.com/legal/privacy-policy</a>
            </p>
          </div>

          {/* 9. Google Fonts */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">9. Google Fonts</h2>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts, die von <strong className="text-primary">Google Ireland Limited</strong> (Gordon House, Barrow Street, Dublin 4, Irland) bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts direkt von Google, wobei Ihre IP-Adresse an Google übertragen wird.
            </p>
            <p className="mt-2">
              Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung).
            </p>
            <p className="mt-2">
              Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline no-underline break-all">https://policies.google.com/privacy</a>
            </p>
          </div>

          {/* 10. Google Maps */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">10. Google Maps</h2>
            <p>
              Diese Website nutzt den Kartendienst <strong className="text-primary">Google Maps</strong> von Google Ireland Limited. Beim Aufruf einer Seite mit eingebetteter Google Maps Karte wird eine Verbindung zu den Servern von Google hergestellt. Hierbei wird Ihre IP-Adresse an Google übertragen.
            </p>
            <p className="mt-2">
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unseres Standorts und einer leichteren Auffindbarkeit. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            <p className="mt-2">
              Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline no-underline break-all">https://policies.google.com/privacy</a>
            </p>
          </div>

          {/* 11. WhatsApp */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">11. WhatsApp-Kontakt</h2>
            <p>
              Auf unserer Website bieten wir die Möglichkeit, uns über <strong className="text-primary">WhatsApp</strong> (Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland) zu kontaktieren. Bei Nutzung dieses Dienstes werden Ihre Nachrichten und Kontaktdaten gemäß den Datenschutzbestimmungen von Meta verarbeitet.
            </p>
            <p className="mt-2">
              Die Kontaktaufnahme über WhatsApp erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung durch Nutzung des Dienstes).
            </p>
          </div>

          {/* 12. SSL/TLS */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">12. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </div>

          {/* Stand */}
          <div className="pt-6 border-t border-border text-xs text-text-light">
            <p>Stand: März 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
