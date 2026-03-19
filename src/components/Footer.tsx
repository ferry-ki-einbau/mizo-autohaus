import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from './Logo'

const staedte = [
  { name: 'Hannover', slug: 'hannover' },
  { name: 'Berlin', slug: 'berlin' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'München', slug: 'muenchen' },
  { name: 'Köln', slug: 'koeln' },
  { name: 'Frankfurt', slug: 'frankfurt' },
  { name: 'Braunschweig', slug: 'braunschweig' },
  { name: 'Wolfsburg', slug: 'wolfsburg' },
  { name: 'Bremen', slug: 'bremen' },
  { name: 'Düsseldorf', slug: 'duesseldorf' },
  { name: 'Dortmund', slug: 'dortmund' },
  { name: 'Hildesheim', slug: 'hildesheim' },
  { name: 'Celle', slug: 'celle' },
  { name: 'Göttingen', slug: 'goettingen' },
  { name: 'Osnabrück', slug: 'osnabrueck' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo inverted />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Ihr Partner für Mobilität und Vertrauen. Ankauf, Verkauf, Finanzierung und Zulassungsdienst aus einer Hand.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Leistungen</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/auto-verkaufen-hannover" className="hover:text-accent transition-colors no-underline text-white/70">Auto verkaufen</Link></li>
              <li><Link to="/gebrauchtwagen-hannover" className="hover:text-accent transition-colors no-underline text-white/70">Gebrauchtwagen</Link></li>
              <li><Link to="/unfallwagen-ankauf" className="hover:text-accent transition-colors no-underline text-white/70">Unfallwagen Ankauf</Link></li>
              <li><Link to="/kfz-finanzierung-hannover" className="hover:text-accent transition-colors no-underline text-white/70">Finanzierung</Link></li>
              <li><Link to="/auto-bewertung-kostenlos" className="hover:text-accent transition-colors no-underline text-white/70">Auto Bewertung</Link></li>
              <li><Link to="/online-zulassung" className="hover:text-accent transition-colors no-underline text-white/70">Online-Zulassung</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Kontakt</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>Vahrenwalder Str. 35<br />30165 Hannover</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <a href="tel:+4915161861808" className="hover:text-accent transition-colors no-underline text-white/70">0151 618 618 08</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <a href="tel:+495113743601" className="hover:text-accent transition-colors no-underline text-white/70">0511 374 36 01</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <a href="mailto:info@mizo-autohaus.de" className="hover:text-accent transition-colors no-underline text-white/70">info@mizo-autohaus.de</a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Öffnungszeiten</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-accent" />
                <span>Mo – Fr: 09:00 – 18:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-accent" />
                <span>Sa: 09:00 – 16:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-accent" />
                <span>So: Geschlossen</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Städte — Autoankauf deutschlandweit */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="font-semibold text-white/90 mb-4">Autoankauf deutschlandweit</h4>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {staedte.map((stadt, i) => (
              <span key={stadt.slug} className="inline-flex items-center">
                <Link
                  to={`/auto-verkaufen/${stadt.slug}`}
                  className="text-sm text-white/50 hover:text-accent transition-colors no-underline"
                >
                  {stadt.name}
                </Link>
                {i < staedte.length - 1 && <span className="text-white/20 mx-1.5">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Mizo Autohaus. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-white/80 transition-colors no-underline text-white/50">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white/80 transition-colors no-underline text-white/50">Datenschutz</Link>
          </div>
        </div>
      </div>
      {/* Spacer for mobile sticky CTA */}
      <div className="h-16 lg:hidden" />
    </footer>
  )
}
