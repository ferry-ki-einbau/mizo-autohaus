interface SectionHeadingProps {
  tag?: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionHeading({ tag, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`reveal ${center ? 'text-center max-w-2xl mx-auto mb-10 sm:mb-14' : 'mb-8 sm:mb-12'}`}>
      {tag && (
        <span className="inline-block text-accent font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-text-muted text-sm sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
