import { MapPin, Award, Users, Heart } from 'lucide-react'
import SectionHeading from './SectionHeading'

const values = [
  { icon: Heart, title: 'Ehrlichkeit', description: 'Transparente Preise ohne versteckte Kosten. Was wir sagen, halten wir.' },
  { icon: Award, title: 'Qualität', description: 'Jedes Fahrzeug wird geprüft und aufbereitet. Sie kaufen nur geprüfte Qualität.' },
  { icon: Users, title: 'Persönlich', description: 'Kein Call-Center. Bei uns sprechen Sie direkt mit dem Inhaber.' },
  { icon: MapPin, title: 'Lokal', description: 'Fest verwurzelt in Hannover. Ihr Autohaus in der Nachbarschaft.' },
]

export default function UeberUns() {
  return (
    <section id="ueber-uns" className="py-16 sm:py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div>
            <SectionHeading
              tag="Über Uns"
              title="Ihr Autohaus in Hannover"
              description="Mizo Autohaus steht für fairen Fahrzeughandel, persönliche Beratung und schnelle Abwicklung."
              center={false}
            />
            <div className="space-y-4">
              {values.map((item, index) => (
                <div
                  key={item.title}
                  className={`reveal reveal-d${index + 1} flex items-start gap-4 group`}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent group-hover:shadow-md group-hover:shadow-accent/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">{item.title}</h3>
                    <p className="text-sm text-text-muted mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm reveal">
                <img
                  src="/images/hof-1-md.webp"
                  alt="Mizo Autohaus Hof"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm reveal reveal-d1">
                <img
                  src="/images/hof-2-md.webp"
                  alt="Mizo Autohaus Gebrauchtwagen"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-border h-[280px] reveal reveal-d2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.3!2d9.7352!3d52.3967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074b5c1c2c18d%3A0x0!2sVahrenwalder+Str.+35%2C+30165+Hannover!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mizo Autohaus Standort"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
