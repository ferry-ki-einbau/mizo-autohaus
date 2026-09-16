import { cn } from '@/lib/utils'

interface FahrzeugPlatzhalterProps {
  marke: string
  modell: string
  size?: 'sm' | 'lg'
  className?: string
}

// Titelbild für Fahrzeuge ohne Foto: Markenfläche statt "Foto folgt"
export default function FahrzeugPlatzhalter({ marke, modell, size = 'sm', className }: FahrzeugPlatzhalterProps) {
  const lg = size === 'lg'
  return (
    <div
      role="img"
      aria-label={`${marke} ${modell} bei Mizo Autohaus`}
      className={cn('relative w-full h-full overflow-hidden bg-primary flex flex-col items-center justify-center text-center px-6', className)}
    >
      {/* feine Diagonallinien + Lichtkegel von oben */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 14px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-accent" aria-hidden="true" />

      <div className="relative">
        <p className={cn('font-black tracking-wide uppercase leading-none text-white', lg ? 'text-3xl sm:text-4xl' : 'text-xl')}>
          MIZO <span className="text-accent">AUTOHAUS</span>
        </p>
        <p className={cn('font-semibold tracking-[0.2em] uppercase text-white/45 mt-1.5', lg ? 'text-xs' : 'text-[10px]')}>
          Hannover
        </p>
        <div className={cn('mx-auto bg-white/15', lg ? 'w-16 h-px my-5' : 'w-10 h-px my-3')} aria-hidden="true" />
        <p className={cn('font-bold text-white/85 truncate', lg ? 'text-lg' : 'text-sm')}>
          {marke} {modell}
        </p>
      </div>
    </div>
  )
}
