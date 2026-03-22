import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  inverted?: boolean
  showTagline?: boolean
}

export default function Logo({ className = '', inverted = false, showTagline = false }: LogoProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className={cn(
        'text-xl font-black tracking-wide uppercase leading-none',
        inverted ? 'text-white' : 'text-primary',
      )}>
        MIZO <span className="text-accent">AUTOHAUS</span>
      </span>
      {showTagline && (
        <span className={cn(
          'text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase mt-0.5',
          inverted ? 'text-white/40' : 'text-text-light',
        )}>
          Hannover · Ankaufstation
        </span>
      )}
    </div>
  )
}
