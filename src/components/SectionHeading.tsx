import { motion } from 'framer-motion'

interface SectionHeadingProps {
  tag?: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionHeading({ tag, title, description, center = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center max-w-2xl mx-auto mb-12' : 'mb-12'}
    >
      {tag && (
        <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-text-muted text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
