import { X, Phone, MessageCircle, ChevronLeft, ChevronRight, Car } from 'lucide-react'
import { useState, useEffect } from 'react'

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

interface Props {
  vehicle: Vehicle
  onClose: () => void
}

export default function FahrzeugDetail({ vehicle, onClose }: Props) {
  const [currentImg, setCurrentImg] = useState(0)
  const fz = vehicle

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const nextImg = () => setCurrentImg(c => (c + 1) % fz.bilder.length)
  const prevImg = () => setCurrentImg(c => (c - 1 + fz.bilder.length) % fz.bilder.length)

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bild-Galerie */}
        <div className="relative aspect-[16/10] bg-bg-muted">
          {fz.preis && (
            <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
              Aktionspreis
            </div>
          )}
          {fz.bilder.length > 0 ? (
            <>
              <img
                src={fz.bilder[currentImg]}
                alt={`${fz.marke} ${fz.modell} — Bild ${currentImg + 1}`}
                className="w-full h-full object-cover"
              />
              {fz.bilder.length > 1 && (
                <>
                  <button onClick={prevImg} aria-label="Vorheriges Bild" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white min-w-[40px] min-h-[40px] flex items-center justify-center">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImg} aria-label="Nächstes Bild" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white min-w-[40px] min-h-[40px] flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {fz.bilder.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImg(i)} aria-label={`Bild ${i + 1}`} className={`w-2 h-2 rounded-full transition-colors ${i === currentImg ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 via-bg-muted to-accent/5 flex flex-col items-center justify-center gap-4 relative">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="w-20 h-20 rounded-2xl bg-primary/[0.06] flex items-center justify-center">
                <Car className="w-10 h-10 text-primary/20" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-primary/30">Bilder folgen in Kürze</p>
                <p className="text-xs text-text-light/40 mt-1">{fz.marke} {fz.modell}</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail-Leiste */}
        {fz.bilder.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {fz.bilder.map((img, i) => (
              <button key={i} onClick={() => setCurrentImg(i)} aria-label={`Bild ${i + 1} anzeigen`} className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${i === currentImg ? 'border-accent' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-black text-primary">{fz.marke} {fz.modell}</h2>
            {fz.preis && (
              <span className="text-xl sm:text-2xl font-black text-accent whitespace-nowrap">
                {Number(fz.preis).toLocaleString('de-DE')} €
              </span>
            )}
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-2 mt-3">
            {fz.baujahr && <span className="bg-bg-soft border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">EZ {fz.baujahr}</span>}
            {fz.kilometerstand && <span className="bg-bg-soft border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">{Number(fz.kilometerstand).toLocaleString('de-DE')} km</span>}
            {fz.kraftstoff && <span className="bg-bg-soft border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">{fz.kraftstoff}</span>}
            {fz.getriebe && <span className="bg-bg-soft border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">{fz.getriebe}</span>}
            {fz.farbe && <span className="bg-bg-soft border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">{fz.farbe}</span>}
          </div>

          {/* Beschreibung */}
          {fz.beschreibung && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">{fz.beschreibung}</p>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-5 flex gap-3">
            <a
              href="tel:+4915161861808"
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3.5 rounded-xl font-bold transition-colors no-underline text-sm min-h-[48px]"
            >
              <Phone className="w-4 h-4" />
              Anrufen
            </a>
            <a
              href={`https://wa.me/4915161861808?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20den%20${encodeURIComponent(fz.marke + ' ' + fz.modell)}%20(${fz.baujahr || ''}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white py-3.5 rounded-xl font-bold transition-colors no-underline text-sm min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
