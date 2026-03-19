import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/4915161861808?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20den%20Fahrzeug-Ankauf."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full items-center justify-center shadow-lg shadow-[#25D366]/30 no-underline"
          aria-label="WhatsApp Chat öffnen"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
