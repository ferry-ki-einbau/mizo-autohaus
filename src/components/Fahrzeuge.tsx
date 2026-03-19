import { useState, useEffect } from 'react'
import { Car, ArrowRight, Phone, Search } from 'lucide-react'
import SectionHeading from './SectionHeading'

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
    <section id="fahrzeuge" className="py-16 sm:py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Aktuelle Fahrzeuge"
          title="Unsere Fahrzeuge im Bestand"
          description="Entdecken Sie unsere Auswahl an geprüften Gebrauchtwagen. Alle Fahrzeuge mit Garantie."
        />

        {loaded && vehicles.length === 0 ? (
          <div className="max-w-2xl mx-auto reveal">
            <div className="bg-white rounded-2xl border border-border p-10 sm:p-14 text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-3">
                Wir sind auf der Suche nach Fahrzeugen
              </h3>
              <p className="text-text-muted leading-relaxed mb-2">
                Unser Bestand wechselt ständig — gute Autos sind schnell verkauft!
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                <strong className="text-primary">Sie möchten Ihr Fahrzeug verkaufen?</strong> Perfekt — wir suchen genau Ihr Auto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+4915161861808" className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-accent/20 no-underline">
                  <Phone className="w-5 h-5" /> 0151 618 618 08
                </a>
                <button onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 border-2 border-primary/20 hover:border-accent/40 text-primary px-8 py-3.5 rounded-xl font-bold transition-all">
                  Fahrzeug anbieten <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((fz, index) => (
                <div
                  key={fz.id}
                  className={`reveal reveal-d${Math.min(index + 1, 5)} bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/20 hover:shadow-xl transition-all duration-300 group`}
                >
                  <div className="aspect-[16/10] bg-bg-muted flex items-center justify-center relative overflow-hidden">
                    {fz.bilder && fz.bilder.length > 0 ? (
                      <img src={fz.bilder[0]} alt={`${fz.marke} ${fz.modell}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                    ) : (
                      <Car className="w-16 h-16 text-text-light/30" />
                    )}
                    {fz.kraftstoff && (
                      <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">{fz.kraftstoff}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-primary">{fz.marke} {fz.modell}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-text-muted">
                      {fz.baujahr && <span>EZ {fz.baujahr}</span>}
                      {fz.kilometerstand && <span>{Number(fz.kilometerstand).toLocaleString('de-DE')} km</span>}
                      {fz.getriebe && <span>{fz.getriebe}</span>}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      {fz.preis && <span className="text-xl font-black text-accent">{Number(fz.preis).toLocaleString('de-DE')} €</span>}
                      <a href="tel:+4915161861808" className="flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark transition-colors no-underline">
                        Anfragen <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
