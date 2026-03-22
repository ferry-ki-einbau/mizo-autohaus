import { ShieldCheck, Star, Lock, Handshake } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'Geprüfter Händler' },
  { icon: Star, label: '5.0 ★ Google' },
  { icon: Lock, label: 'Sichere Datenübertragung' },
  { icon: Handshake, label: 'Faire Preise garantiert' },
]

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-xs text-text-muted">
          <Icon className="w-4 h-4 text-accent" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
