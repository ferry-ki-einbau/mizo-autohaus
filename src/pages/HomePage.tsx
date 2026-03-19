import Hero from '@/components/Hero'
import AnkaufForm from '@/components/AnkaufForm'
import Prozess from '@/components/Prozess'
import WhyUs from '@/components/WhyUs'
import Bewertungen from '@/components/Bewertungen'
import Leistungen from '@/components/Leistungen'
import Fahrzeuge from '@/components/Fahrzeuge'
import FAQ from '@/components/FAQ'
import Partner from '@/components/Partner'
import UeberUns from '@/components/UeberUns'
import CTABanner from '@/components/CTABanner'

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
      <Bewertungen />
      <Leistungen />
      <Fahrzeuge />
      <FAQ />
      <Partner />
      <UeberUns />
      <CTABanner />
    </>
  )
}
