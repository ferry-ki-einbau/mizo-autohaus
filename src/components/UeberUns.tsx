import { motion } from 'framer-motion'
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
              description="Mizo Autohaus steht für fairen Fahrzeughandel, persönliche Beratung und schnelle Abwicklung. Als Ihr lokaler Partner bieten wir alles rund ums Auto."
              center={false}
            />
            <div className="space-y-4">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent group-hover:shadow-md group-hover:shadow-accent/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-sm text-text-muted mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bilder + Map */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-border shadow-sm"
              >
                <img
                  src="/images/hof-1-md.webp"
                  alt="Mizo Autohaus Hof — Fahrzeugauswahl"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl overflow-hidden border border-border shadow-sm"
              >
                <img
                  src="/images/hof-2-md.webp"
                  alt="Mizo Autohaus Hof — Premium Gebrauchtwagen"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-sm border border-border h-[280px]"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
