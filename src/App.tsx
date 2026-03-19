import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import PromoBanner from './components/PromoBanner'
import ScrollRestoration from './components/ScrollRestoration'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ZulassungPage from './pages/ZulassungPage'
import KontaktPage from './pages/KontaktPage'
import ImpressumPage from './pages/ImpressumPage'
import DatenschutzPage from './pages/DatenschutzPage'
import NotFoundPage from './pages/NotFoundPage'
import AutoVerkaufenHannoverPage from './pages/AutoVerkaufenHannoverPage'
import GebrauchtwagenHannoverPage from './pages/GebrauchtwagenHannoverPage'
import UnfallwagenAnkaufPage from './pages/UnfallwagenAnkaufPage'
import FinanzierungPage from './pages/FinanzierungPage'
import AutoBewertungPage from './pages/AutoBewertungPage'
import StadtAnkaufPage from './pages/StadtAnkaufPage'

// Admin only lazy (no SEO needed)
const Admin = lazy(() => import('./pages/AdminPage'))

// Client-only components (use window/localStorage)
const isClient = typeof window !== 'undefined'

function ClientOverlays() {
  if (!isClient) return null
  const MobileCTA = lazy(() => import('./components/MobileCTA'))
  const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'))
  const ScrollToTop = lazy(() => import('./components/ScrollToTop'))
  const CookieConsent = lazy(() => import('./components/CookieConsent'))
  return (
    <Suspense fallback={null}>
      <MobileCTA />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </Suspense>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/online-zulassung" element={<ZulassungPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/auto-verkaufen-hannover" element={<AutoVerkaufenHannoverPage />} />
            <Route path="/gebrauchtwagen-hannover" element={<GebrauchtwagenHannoverPage />} />
            <Route path="/unfallwagen-ankauf" element={<UnfallwagenAnkaufPage />} />
            <Route path="/kfz-finanzierung-hannover" element={<FinanzierungPage />} />
            <Route path="/auto-bewertung-kostenlos" element={<AutoBewertungPage />} />
            <Route path="/auto-verkaufen/:stadt" element={<StadtAnkaufPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ClientOverlays />
    </div>
  )
}

export default App
