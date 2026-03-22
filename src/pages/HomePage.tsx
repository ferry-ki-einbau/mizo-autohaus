import { lazy, Suspense } from 'react'
import Hero from '@/components/Hero'
import AnkaufForm from '@/components/AnkaufForm'
import Prozess from '@/components/Prozess'
import WhyUs from '@/components/WhyUs'

// Below-the-fold components — lazy loaded for better LCP
const Bewertungen = lazy(() => import('@/components/Bewertungen'))
const Leistungen = lazy(() => import('@/components/Leistungen'))
const Fahrzeuge = lazy(() => import('@/components/Fahrzeuge'))
const FAQ = lazy(() => import('@/components/FAQ'))
const Partner = lazy(() => import('@/components/Partner'))
const UeberUns = lazy(() => import('@/components/UeberUns'))
const CTABanner = lazy(() => import('@/components/CTABanner'))

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Mobile: Formular direkt nach Hero (Conversion first) */}
      <div className="sm:hidden">
        <AnkaufForm />
      </div>
      <Prozess />
      {/* Desktop/Tablet: Formular nach Prozess */}
      <div className="hidden sm:block">
        <AnkaufForm />
      </div>
      <WhyUs />
      <Suspense fallback={<div className="py-24" />}>
        <Bewertungen />
        <Leistungen />
        <Fahrzeuge />
        <FAQ />
        <Partner />
        <UeberUns />
        <CTABanner />
      </Suspense>
    </>
  )
}
