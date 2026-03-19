import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  inverted?: boolean
}

export default function Logo({ className = '', inverted = false }: LogoProps) {
  return (
    <span className={cn(
      'text-xl font-black tracking-wide uppercase',
      inverted ? 'text-white' : 'text-primary',
      className
    )}>
      MIZO <span className="text-accent">AUTOHAUS</span>
    </span>
  )
}
