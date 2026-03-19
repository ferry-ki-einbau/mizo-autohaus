import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('mizo-cookie-consent')
    if (!consent) {
      // Show after 1 second so it doesn't interfere with page load
      const timer = setTimeout(() => setShow(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('mizo-cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('mizo-cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 lg:bottom-6 left-0 lg:left-6 right-0 lg:right-auto z-50 lg:max-w-md"
        >
          <div className="bg-white border border-border rounded-t-2xl lg:rounded-2xl shadow-xl p-5 mx-0 lg:mx-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-primary text-sm">Cookie-Einstellungen</h4>
                <p className="text-text-muted text-xs mt-1 leading-relaxed">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.{' '}
                  <Link to="/datenschutz" className="text-accent hover:underline no-underline">
                    Mehr erfahren
                  </Link>
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={accept}
                    className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Akzeptieren
                  </button>
                  <button
                    onClick={decline}
                    className="border border-border hover:bg-bg-soft text-text-muted px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    Ablehnen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
