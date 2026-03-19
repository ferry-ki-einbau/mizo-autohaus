import { useState, useEffect } from 'react'
import { Car, ArrowRight, Phone, Search, Filter, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

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

export default function FahrzeugePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('')

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

  const filtered = filter
    ? vehicles.filter(v => `${v.marke} ${v.modell} ${v.kraftstoff}`.toLowerCase().includes(filter.toLowerCase()))
    : vehicles

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/8 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3">
            Aktuelle Fahrzeuge
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Unsere Fahrzeuge <span className="text-accent">im Bestand</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/60 text-sm sm:text-lg max-w-2xl mx-auto">
            Geprüfte Gebrauchtwagen mit Garantie. Faire Preise, flexible Finanzierung.
          </p>

          {/* Zähler */}
          {loaded && vehicles.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-5 py-2">
              <Car className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">{vehicles.length} Fahrzeuge verfügbar</span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter — nur wenn Fahrzeuge vorhanden */}
          {loaded && vehicles.length > 0 && (
            <div className="mb-8 sm:mb-10 max-w-md">
              <div className="relative">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                <input
                  type="text"
                  placeholder="Marke, Modell oder Kraftstoff suchen..."
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-text text-sm focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-text-light min-h-[44px]"
                />
              </div>
            </div>
          )}

          {/* Keine Fahrzeuge */}
          {loaded && vehicles.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-bg-soft rounded-2xl border border-border p-10 sm:p-14 text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-2xl font-black text-primary mb-3">
                  Aktuell keine Fahrzeuge im Bestand
                </h2>
                <p className="text-text-muted leading-relaxed mb-2">
                  Unser Bestand wechselt ständig — gute Autos sind schnell verkauft!
                </p>
                <p className="text-text-muted leading-relaxed mb-8">
                  <strong className="text-primary">Sie möchten Ihr Fahrzeug verkaufen?</strong> Perfekt — wir suchen genau Ihr Auto.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:+4915161861808" className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-xl font-bold transition-all no-underline">
                    <Phone className="w-5 h-5" /> 0151 618 618 08
                  </a>
                  <Link to="/#ankauf" className="flex items-center gap-2 border-2 border-primary/20 hover:border-accent/40 text-primary px-8 py-3.5 rounded-xl font-bold transition-all no-underline">
                    Fahrzeug anbieten <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Fahrzeug-Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filtered.map((fz) => (
                  <div
                    key={fz.id}
                    className="bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/20 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Bild-Galerie */}
                    <div className="aspect-[16/10] bg-bg-muted flex items-center justify-center relative overflow-hidden">
                      {fz.bilder && fz.bilder.length > 0 ? (
                        <img
                          src={fz.bilder[0]}
                          alt={`${fz.marke} ${fz.modell}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <Car className="w-16 h-16 text-text-light/30" />
                      )}
                      {fz.kraftstoff && (
                        <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {fz.kraftstoff}
                        </div>
                      )}
                      {fz.bilder && fz.bilder.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                          +{fz.bilder.length - 1} Fotos
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-primary">{fz.marke} {fz.modell}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-text-muted">
                        {fz.baujahr && <span>EZ {fz.baujahr}</span>}
                        {fz.kilometerstand && <span>{Number(fz.kilometerstand).toLocaleString('de-DE')} km</span>}
                        {fz.getriebe && <span>{fz.getriebe}</span>}
                        {fz.farbe && <span>{fz.farbe}</span>}
                      </div>
                      {fz.beschreibung && (
                        <p className="mt-2 text-sm text-text-muted line-clamp-2">{fz.beschreibung}</p>
                      )}
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        {fz.preis && (
                          <span className="text-xl font-black text-accent">
                            {Number(fz.preis).toLocaleString('de-DE')} €
                          </span>
                        )}
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/4915161861808?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20den%20${encodeURIComponent(fz.marke + ' ' + fz.modell)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm font-bold text-[#25D366] hover:text-[#1fb855] transition-colors no-underline"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <a
                            href="tel:+4915161861808"
                            className="flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark transition-colors no-underline"
                          >
                            Anfragen <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Keine Ergebnisse bei Filter */}
              {filtered.length === 0 && filter && (
                <div className="text-center py-12">
                  <p className="text-text-muted">Keine Fahrzeuge für "{filter}" gefunden.</p>
                  <button onClick={() => setFilter('')} className="mt-2 text-accent font-bold text-sm hover:underline">Filter zurücksetzen</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
