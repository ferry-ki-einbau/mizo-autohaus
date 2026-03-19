import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface ConsentState {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'mizo-cookie-consent'

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try { return JSON.parse(stored) } catch { return null }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const stored = getConsent()
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const save = (state: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setShow(false)
  }

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true })
  const acceptSelected = () => save(consent)
  const declineAll = () => save({ necessary: true, analytics: false, marketing: false })

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={declineAll}
          />

          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[61] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-lg"
          >
            <div className="bg-white border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base">Datenschutz-Einstellungen</h3>
                  <p className="text-text-muted text-xs mt-1 leading-relaxed">
                    Wir nutzen Cookies und ähnliche Technologien. Notwendige Cookies sind für den Betrieb erforderlich.
                    Weitere Informationen finden Sie in unserer{' '}
                    <Link to="/datenschutz" className="text-accent hover:underline no-underline" onClick={() => setShow(false)}>
                      Datenschutzerklärung
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Details Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors mb-4"
              >
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showDetails && 'rotate-180')} />
                Einstellungen anpassen
              </button>

              {/* Cookie-Kategorien */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4 pb-4 border-b border-border">
                      {/* Notwendig — immer an */}
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-primary">Notwendig</span>
                          <p className="text-[11px] text-text-light">Für den Betrieb der Website erforderlich</p>
                        </div>
                        <div className="w-10 h-5 bg-accent/20 rounded-full relative cursor-not-allowed">
                          <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent rounded-full" />
                        </div>
                      </label>

                      {/* Analyse */}
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-sm font-medium text-primary">Analyse</span>
                          <p className="text-[11px] text-text-light">Hilft uns die Website zu verbessern</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                          className={cn(
                            'w-10 h-5 rounded-full relative transition-colors',
                            consent.analytics ? 'bg-accent/20' : 'bg-border'
                          )}
                        >
                          <div className={cn(
                            'absolute top-0.5 w-4 h-4 rounded-full transition-all',
                            consent.analytics ? 'right-0.5 bg-accent' : 'left-0.5 bg-text-light'
                          )} />
                        </button>
                      </label>

                      {/* Marketing */}
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-sm font-medium text-primary">Marketing</span>
                          <p className="text-[11px] text-text-light">Für personalisierte Inhalte und Werbung</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConsent(c => ({ ...c, marketing: !c.marketing }))}
                          className={cn(
                            'w-10 h-5 rounded-full relative transition-colors',
                            consent.marketing ? 'bg-accent/20' : 'bg-border'
                          )}
                        >
                          <div className={cn(
                            'absolute top-0.5 w-4 h-4 rounded-full transition-all',
                            consent.marketing ? 'right-0.5 bg-accent' : 'left-0.5 bg-text-light'
                          )} />
                        </button>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-accent hover:bg-accent-dark text-white py-2.5 rounded-lg text-sm font-bold transition-colors"
                >
                  Alle akzeptieren
                </button>
                {showDetails ? (
                  <button
                    onClick={acceptSelected}
                    className="flex-1 border border-border hover:bg-bg-soft text-primary py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Auswahl speichern
                  </button>
                ) : (
                  <button
                    onClick={declineAll}
                    className="flex-1 border border-border hover:bg-bg-soft text-text-muted py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Nur notwendige
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
