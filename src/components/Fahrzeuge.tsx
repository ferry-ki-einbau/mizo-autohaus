import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Search, ChevronRight } from 'lucide-react'
import FahrzeugDetail from './FahrzeugDetail'

interface Vehicle {
  id: string
  marke: string
  modell: string
  baujahr: string
  kilometerstand: string
  preis: string
  kraftstoff: string
  getriebe: string
  farbe: string
  beschreibung: string
  bilder: string[]
}

export default function Fahrzeuge() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loaded, setLoaded] = useState(false)
  const [selected, setSelected] = useState<Vehicle | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/vehicles')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (!cancelled && Array.isArray(data)) setVehicles(data)
        setLoaded(true)
      })
      .catch(() => { setLoaded(true) })
    return () => { cancelled = true }
  }, [])

  return (
    <section id="fahrzeuge" className="py-16 sm:py-24 bg-bg-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mit "Alle anzeigen" Link */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div className="reveal">
            <span className="inline-block text-accent font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3">
              Aktuelle Fahrzeuge
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
              Unsere Fahrzeuge im Bestand
            </h2>
          </div>
          {vehicles.length > 0 && (
            <Link
              to="/fahrzeuge"
              className="hidden sm:flex items-center gap-1.5 text-accent font-bold text-sm hover:gap-2.5 transition-all no-underline shrink-0 mb-2"
            >
              Alle anzeigen
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {loaded && vehicles.length === 0 ? (
          /* Keine Fahrzeuge — CTA */
          <div className="max-w-2xl mx-auto reveal">
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-14 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary mb-3">
                Wir sind auf der Suche nach Fahrzeugen
              </h3>
              <p className="text-text-muted leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                <strong className="text-primary">Sie möchten Ihr Fahrzeug verkaufen?</strong> Perfekt — wir suchen genau Ihr Auto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="tel:+4915161861808" className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-bold transition-all no-underline text-sm w-full sm:w-auto justify-center">
                  <Phone className="w-4 h-4" /> Anrufen
                </a>
                <button onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 border-2 border-primary/20 hover:border-accent/40 text-primary px-6 py-3 rounded-xl font-bold transition-all text-sm w-full sm:w-auto justify-center">
                  Fahrzeug anbieten <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Horizontaler Scroll-Slider */}
            <div
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {vehicles.map((fz) => (
                <div
                  key={fz.id}
                  onClick={() => setSelected(fz)}
                  className="min-w-[260px] sm:min-w-[300px] lg:min-w-[340px] max-w-[340px] snap-start shrink-0 bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-[16/10] bg-bg-muted flex items-center justify-center relative overflow-hidden">
                    {fz.preis && (
                      <div className="absolute top-3 left-3 z-10 bg-accent text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-wider">Aktionspreis</div>
                    )}
                    {fz.bilder && fz.bilder.length > 0 ? (
                      <img src={fz.bilder[0]} alt={`${fz.marke} ${fz.modell}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                    ) : (
                      <div className="relative w-full h-full">
                        <img src="/images/vehicle-placeholder.webp" alt={`${fz.marke} ${fz.modell}`} className="w-full h-full object-cover opacity-40" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-5 py-4 shadow-sm border border-border/50">
                            <p className="text-sm font-bold text-primary">Frisch eingetroffen</p>
                            <p className="text-xs text-text-muted mt-1">Bilder werden gerade aufbereitet</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {fz.kraftstoff && (
                      <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">{fz.kraftstoff}</div>
                    )}
                    {fz.bilder && fz.bilder.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                        +{fz.bilder.length - 1} Fotos
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-primary">{fz.marke} {fz.modell}</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs sm:text-sm text-text-muted">
                      {fz.baujahr && <span>EZ {fz.baujahr}</span>}
                      {fz.kilometerstand && <span>{Number(fz.kilometerstand).toLocaleString('de-DE')} km</span>}
                      {fz.getriebe && <span>{fz.getriebe}</span>}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      {fz.preis && <span className="text-lg sm:text-xl font-black text-accent">{Number(fz.preis).toLocaleString('de-DE')} €</span>}
                      <a href="tel:+4915161861808" className="flex items-center gap-1 text-xs sm:text-sm font-bold text-accent hover:text-accent-dark transition-colors no-underline">
                        Anfragen <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* "Alle anzeigen" Card am Ende */}
              <Link
                to="/fahrzeuge"
                className="min-w-[200px] sm:min-w-[240px] snap-start shrink-0 bg-white rounded-2xl border border-border hover:border-accent/20 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center p-6 no-underline group"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/25 transition-all">
                  <ArrowRight className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <span className="font-bold text-primary text-sm">Alle Fahrzeuge</span>
                <span className="text-text-muted text-xs mt-1">{vehicles.length} im Bestand</span>
              </Link>
            </div>

            {/* Mobile: "Alle anzeigen" Button */}
            <div className="sm:hidden text-center mt-6">
              <Link
                to="/fahrzeuge"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all no-underline"
              >
                Alle {vehicles.length} Fahrzeuge anzeigen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <FahrzeugDetail vehicle={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
