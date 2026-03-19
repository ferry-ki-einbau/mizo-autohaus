import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex gap-3">
            <a
              href="tel:+4915161861808"
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3 rounded-xl font-semibold transition-colors no-underline text-sm"
            >
              <Phone className="w-4 h-4" />
              Anrufen
            </a>
            <a
              href="https://wa.me/4915161861808?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20den%20Fahrzeug-Ankauf."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white py-3 rounded-xl font-semibold transition-colors no-underline text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
