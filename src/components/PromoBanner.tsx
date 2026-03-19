import { useState, useEffect } from 'react'
import { X, ShieldAlert, CheckCircle, Banknote, Truck, FileCheck, Phone, ArrowRight } from 'lucide-react'

export default function PromoBanner() {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Banner nach 2s zeigen (nicht sofort — lässt Hero wirken)
    const dismissed = sessionStorage.getItem('mizo-promo-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setBannerVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismissBanner = () => {
    setBannerVisible(false)
    sessionStorage.setItem('mizo-promo-dismissed', '1')
  }

  const openModal = () => {
    setModalOpen(true)
    setBannerVisible(false)
  }

  const closeModal = () => {
    setModalOpen(false)
    sessionStorage.setItem('mizo-promo-dismissed', '1')
  }

  // Body scroll lock für Modal
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [modalOpen])

  return (
    <>
      {/* Klickbarer Banner oben auf der Seite */}
      {bannerVisible && (
        <div className="bg-accent text-white relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2.5 sm:py-3 gap-3">
              <button
                onClick={openModal}
                className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold hover:underline text-left sm:text-center min-h-[44px]"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 hidden sm:block" />
                Keine Lust auf unseriöse Angebote? → So läuft es bei uns. Fair. Fix. Fertig.
              </button>
              <button
                onClick={dismissBanner}
                className="p-1.5 hover:bg-white/15 rounded-lg transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Banner schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal — Premium Verkaufsargumente */}
      {modalOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative bg-white w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="bg-primary text-white p-6 sm:p-8 sticky top-0 z-10">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-accent text-xs font-bold uppercase tracking-wider">Schluss damit</p>
                  <h2 className="text-xl sm:text-2xl font-black">Keine unseriösen Angebote.</h2>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Kein "Was ist letzter Preis?", keine Zeitverschwendung, keine Überraschungen vor Ort.
              </p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Problem */}
              <div className="bg-bg-soft rounded-xl p-4 border border-border">
                <p className="text-sm text-text-muted leading-relaxed">
                  <strong className="text-primary">Kennen Sie das?</strong> Stundenlang Nachrichten mit Interessenten, die dann doch nicht kommen. Oder Käufer, die vor Ort plötzlich den Preis drücken wollen. Bei uns läuft das anders.
                </p>
              </div>

              {/* So läuft es bei uns */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">So läuft es bei Mizo Autohaus:</h3>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, title: 'Festes Angebot', text: 'Nach der Einigung bekommen Sie ein verbindliches Fixum. Kein Nachverhandeln, kein Drücken.' },
                    { icon: Banknote, title: 'Bargeld oder Überweisung', text: 'Sie entscheiden: Sofortauszahlung in bar oder sichere Überweisung auf Ihr Konto. Am selben Tag.' },
                    { icon: FileCheck, title: 'Sofortige Abmeldung', text: 'Wir kümmern uns um alles — Abmeldung, Ummeldung, Versicherung. Sie müssen nichts tun.' },
                    { icon: Truck, title: 'Bundesweite Abholung', text: 'Kein Bock zu fahren? Wir holen Ihr Fahrzeug deutschlandweit ab. Kostenlos.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">{item.title}</p>
                        <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    closeModal()
                    setTimeout(() => {
                      document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3.5 rounded-xl font-bold transition-colors text-sm"
                >
                  Jetzt faires Angebot anfordern
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+4915161861808"
                  className="w-full flex items-center justify-center gap-2 border-2 border-border hover:bg-bg-soft text-primary py-3.5 rounded-xl font-bold transition-colors text-sm no-underline"
                >
                  <Phone className="w-4 h-4" />
                  Lieber direkt anrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
