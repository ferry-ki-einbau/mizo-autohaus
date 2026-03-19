import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, Shield, Clock, Banknote, CheckCircle, Phone, MapPin, Star, Truck } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import AnkaufForm from '@/components/AnkaufForm'

interface StadtInfo {
  name: string
  region: string
  beschreibung: string
  umgebung: string[]
}

const staedte: Record<string, StadtInfo> = {
  berlin: { name: 'Berlin', region: 'Berlin & Brandenburg', beschreibung: 'Als größte Stadt Deutschlands gibt es in Berlin einen riesigen Markt für Gebrauchtwagen. Wir kaufen Ihr Fahrzeug in Berlin und Umgebung — egal ob in Mitte, Charlottenburg, Kreuzberg oder am Stadtrand.', umgebung: ['Potsdam', 'Spandau', 'Köpenick', 'Reinickendorf', 'Brandenburg'] },
  hamburg: { name: 'Hamburg', region: 'Hamburg & Schleswig-Holstein', beschreibung: 'In der Hansestadt Hamburg kaufen wir Fahrzeuge aller Art an. Ob in der Innenstadt, Altona, Harburg oder Bergedorf — wir kommen zu Ihnen oder Sie kommen zu uns.', umgebung: ['Norderstedt', 'Pinneberg', 'Ahrensburg', 'Lüneburg', 'Buxtehude'] },
  muenchen: { name: 'München', region: 'München & Oberbayern', beschreibung: 'München ist bekannt für hochwertige Fahrzeuge. Wir kaufen Ihr Premium-Fahrzeug in München und ganz Oberbayern zu fairen Marktpreisen an.', umgebung: ['Freising', 'Dachau', 'Starnberg', 'Erding', 'Rosenheim'] },
  koeln: { name: 'Köln', region: 'Köln & Rheinland', beschreibung: 'Im Raum Köln und dem gesamten Rheinland sind wir Ihr Ansprechpartner für den Fahrzeugankauf. Faire Bewertung, schnelle Abwicklung.', umgebung: ['Bonn', 'Leverkusen', 'Bergisch Gladbach', 'Troisdorf', 'Brühl'] },
  frankfurt: { name: 'Frankfurt', region: 'Frankfurt & Rhein-Main', beschreibung: 'Im Rhein-Main-Gebiet rund um Frankfurt kaufen wir Fahrzeuge aller Marken an. Schnelle Abwicklung für Geschäftsleute und Privatpersonen.', umgebung: ['Offenbach', 'Wiesbaden', 'Mainz', 'Darmstadt', 'Hanau'] },
  wolfsburg: { name: 'Wolfsburg', region: 'Wolfsburg & Region', beschreibung: 'In der VW-Stadt Wolfsburg kaufen wir besonders gerne Fahrzeuge an. Nur 90km von unserem Standort entfernt — kurze Wege, schnelle Abwicklung.', umgebung: ['Gifhorn', 'Helmstedt', 'Braunschweig', 'Peine', 'Salzgitter'] },
  hildesheim: { name: 'Hildesheim', region: 'Hildesheim & Südniedersachsen', beschreibung: 'In Hildesheim und Umgebung kaufen wir Ihr Fahrzeug zu fairen Preisen. Nur 30km von unserem Standort in Hannover entfernt.', umgebung: ['Sarstedt', 'Alfeld', 'Bad Salzdetfurth', 'Nordstemmen', 'Bockenem'] },
  celle: { name: 'Celle', region: 'Celle & Südheide', beschreibung: 'Im Raum Celle sind wir besonders schnell bei Ihnen — nur 40km von Hannover. Faire Preise für alle Fahrzeuge.', umgebung: ['Bergen', 'Winsen', 'Hermannsburg', 'Wietze', 'Hambühren'] },
  goettingen: { name: 'Göttingen', region: 'Göttingen & Südniedersachsen', beschreibung: 'In der Universitätsstadt Göttingen und ganz Südniedersachsen kaufen wir Fahrzeuge aller Art an.', umgebung: ['Northeim', 'Duderstadt', 'Einbeck', 'Hann. Münden', 'Osterode'] },
  osnabrueck: { name: 'Osnabrück', region: 'Osnabrück & Emsland', beschreibung: 'Im Raum Osnabrück kaufen wir Ihr Fahrzeug zu fairen Marktpreisen an. Auch Abholung möglich.', umgebung: ['Melle', 'Georgsmarienhütte', 'Bad Iburg', 'Bramsche', 'Wallenhorst'] },
  oldenburg: { name: 'Oldenburg', region: 'Oldenburg & Ammerland', beschreibung: 'In Oldenburg und der gesamten Weser-Ems-Region sind wir Ihr Ansprechpartner für den Fahrzeugankauf.', umgebung: ['Bad Zwischenahn', 'Westerstede', 'Edewecht', 'Rastede', 'Wardenburg'] },
  magdeburg: { name: 'Magdeburg', region: 'Magdeburg & Sachsen-Anhalt', beschreibung: 'In der Landeshauptstadt Magdeburg kaufen wir Fahrzeuge aller Marken und Zustände an. Faire Bewertung garantiert.', umgebung: ['Schönebeck', 'Haldensleben', 'Burg', 'Stendal', 'Wolmirstedt'] },
  duesseldorf: { name: 'Düsseldorf', region: 'Düsseldorf & Niederrhein', beschreibung: 'In der Landeshauptstadt Düsseldorf und am gesamten Niederrhein kaufen wir Ihr Fahrzeug zu Top-Preisen an.', umgebung: ['Neuss', 'Meerbusch', 'Ratingen', 'Mönchengladbach', 'Krefeld'] },
  dortmund: { name: 'Dortmund', region: 'Dortmund & Ruhrgebiet', beschreibung: 'Im Ruhrgebiet rund um Dortmund gibt es einen großen Gebrauchtwagenmarkt. Wir kaufen Ihr Fahrzeug schnell und fair an.', umgebung: ['Essen', 'Bochum', 'Hagen', 'Unna', 'Witten'] },
  leipzig: { name: 'Leipzig', region: 'Leipzig & Sachsen', beschreibung: 'In Leipzig und ganz Sachsen kaufen wir Fahrzeuge aller Art an. Ob Kleinwagen oder SUV — wir machen Ihnen ein faires Angebot.', umgebung: ['Halle', 'Merseburg', 'Chemnitz', 'Taucha', 'Markkleeberg'] },
  bremen: { name: 'Bremen', region: 'Bremen & Niedersachsen', beschreibung: 'Im Raum Bremen und Niedersachsen sind wir besonders gut aufgestellt. Kurze Wege von unserem Standort in Hannover.', umgebung: ['Bremerhaven', 'Delmenhorst', 'Oldenburg', 'Verden', 'Stuhr'] },
  dresden: { name: 'Dresden', region: 'Dresden & Sachsen', beschreibung: 'In Dresden und Umgebung kaufen wir Ihr Fahrzeug zu fairen Konditionen an. Auch Fahrzeuge mit Unfallschaden oder ohne TÜV.', umgebung: ['Radebeul', 'Pirna', 'Freital', 'Meißen', 'Coswig'] },
  nuernberg: { name: 'Nürnberg', region: 'Nürnberg & Franken', beschreibung: 'In der Metropolregion Nürnberg kaufen wir Fahrzeuge aller Art an. Faire Preise, schnelle Abwicklung.', umgebung: ['Fürth', 'Erlangen', 'Schwabach', 'Bamberg', 'Ansbach'] },
  braunschweig: { name: 'Braunschweig', region: 'Braunschweig & Region', beschreibung: 'Nur 60km von unserem Standort in Hannover entfernt — in Braunschweig kaufen wir besonders gerne Fahrzeuge an.', umgebung: ['Wolfsburg', 'Salzgitter', 'Gifhorn', 'Peine', 'Helmstedt'] },
  hannover: { name: 'Hannover', region: 'Hannover & Region', beschreibung: 'Direkt bei uns vor Ort in Hannover. Bringen Sie Ihr Fahrzeug einfach vorbei — Vahrenwalder Str. 35. Bewertung, Angebot und Auszahlung am selben Tag möglich.', umgebung: ['Langenhagen', 'Laatzen', 'Garbsen', 'Lehrte', 'Burgdorf', 'Barsinghausen', 'Wunstorf'] },
  essen: { name: 'Essen', region: 'Essen & Ruhrgebiet', beschreibung: 'Im Herzen des Ruhrgebiets kaufen wir in Essen und Umgebung Fahrzeuge aller Art an. Faire Preise für alle Marken.', umgebung: ['Mülheim', 'Oberhausen', 'Gelsenkirchen', 'Bottrop', 'Duisburg'] },
}

const vorteile = [
  'Kostenlose Fahrzeugbewertung',
  'Sofortauszahlung am selben Tag',
  'Alle Marken und Modelle',
  'Auch ohne TÜV oder mit Schäden',
  'Kostenlose Abmeldung inklusive',
  'Deutschlandweiter Ankauf',
  'Abholung möglich',
  'Über 500 zufriedene Kunden',
]

export default function StadtAnkaufPage() {
  const { stadt } = useParams<{ stadt: string }>()
  const info = staedte[stadt || ''] || staedte.hannover
  const stadtName = info.name

  return (
    <div>
      {/* Hero mit Bild */}
      <section className="relative text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-autohaus-desktop.webp" alt={`Auto verkaufen in ${info.name} — Mizo Autohaus`} className="w-full h-full object-cover object-bottom" loading="eager" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" /> {info.region}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Auto verkaufen in <span className="text-accent">{stadtName}</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Sie möchten Ihr Auto in {stadtName} verkaufen? Mizo Autohaus kauft Ihr Fahrzeug — faire Bewertung, Sofortauszahlung, kostenlose Abmeldung. Deutschlandweit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-primary px-10 py-5 rounded-xl text-xl font-bold transition-all hover:bg-accent hover:text-white shadow-2xl shadow-white/20 flex items-center gap-3 no-underline">
                Jetzt Auto bewerten lassen <ArrowDown className="w-5 h-5" />
              </button>
              <a href="tel:+4915161861808" className="bg-accent/20 border-2 border-accent/40 text-white px-8 py-5 rounded-xl text-xl font-bold no-underline flex items-center gap-3">
                <Phone className="w-6 h-6" /> 0151 618 618 08
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-6 bg-bg-soft border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted">
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Seriöser Ankauf</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> Angebot in 24h</span>
          <span className="flex items-center gap-2"><Banknote className="w-4 h-4 text-accent" /> Sofortauszahlung</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent" /> Abholung möglich</span>
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> 500+ Kunden</span>
        </div>
      </section>

      {/* Formular */}
      <AnkaufForm />

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6">
              <SectionHeading tag={`Autoankauf ${stadtName}`} title={`Wir kaufen Ihr Auto in ${stadtName}`} center={false} />
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>{info.beschreibung}</p>
                <p>
                  <strong className="text-primary">So einfach geht's:</strong> Füllen Sie unser kurzes Online-Formular aus oder rufen Sie uns an. Wir bewerten Ihr Fahrzeug und machen Ihnen innerhalb von 24 Stunden ein faires Angebot. Bei Fahrzeugen in {stadtName} bieten wir auch eine <strong className="text-primary">kostenlose Abholung</strong> an.
                </p>
                <p>
                  Wir kaufen <strong className="text-primary">alle Marken, alle Modelle, alle Zustände</strong>. PKW, SUV, Transporter, Sportwagen. Auch Unfallfahrzeuge, Fahrzeuge ohne TÜV, mit Motorschaden oder hoher Laufleistung.
                </p>
                <h3 className="text-xl font-bold text-primary pt-4">Autoankauf {stadtName} — warum Mizo Autohaus?</h3>
                <p>
                  Im Gegensatz zu großen Online-Ankäufern sind wir ein inhabergeführtes Autohaus. Das bedeutet: <strong className="text-primary">Kein Lockpreis</strong>, der später nach unten korrigiert wird. Was wir anbieten, zahlen wir auch.
                </p>
                <h3 className="text-xl font-bold text-primary pt-4">Auch in der Umgebung von {stadtName}</h3>
                <p>
                  Wir kaufen nicht nur in {stadtName} selbst, sondern auch in der gesamten Region an: <strong className="text-primary">{info.umgebung.join(', ')}</strong> und weitere Städte in {info.region}.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-bg-soft rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-primary mb-4">Ihre Vorteile</h3>
                <ul className="space-y-3">
                  {vorteile.map(v => (
                    <li key={v} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {v}
                    </li>
                  ))}
                </ul>
                <button onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 block w-full bg-accent hover:bg-accent-dark text-white text-center py-3 rounded-xl font-semibold transition-colors">
                  Auto in {stadtName} verkaufen
                </button>
                <a href="tel:+4915161861808" className="mt-3 flex items-center justify-center gap-2 text-sm text-accent font-medium no-underline">
                  <Phone className="w-4 h-4" /> 0151 618 618 08
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
