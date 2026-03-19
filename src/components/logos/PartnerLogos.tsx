export function SixtLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-label="Sixt">
      <text x="60" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="900" fill="#e64626" letterSpacing="-1">SIXT</text>
    </svg>
  )
}

export function AvisLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-label="Avis">
      <text x="60" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#d31b1b" letterSpacing="1">AVIS</text>
    </svg>
  )
}

export function TeslaLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" className={className} aria-label="Tesla">
      <path d="M60 5 L60 12 C60 12 48 10 40 16 L60 45 L80 16 C72 10 60 12 60 12 Z" fill="#cc0000" />
      <text x="60" y="48" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" fill="#333" letterSpacing="4">TESLA</text>
    </svg>
  )
}

export function CATLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 40" className={className} aria-label="CAT Germany GmbH">
      <text x="80" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="900" fill="#1a1a2e" letterSpacing="1">CAT</text>
      <text x="80" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="400" fill="#666" letterSpacing="0.5">Germany GmbH</text>
    </svg>
  )
}

export function AutohausKoenigLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 45" className={className} aria-label="Autohaus König">
      <text x="80" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="400" fill="#333" letterSpacing="0.5">AUTOHAUS</text>
      <text x="80" y="38" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="#d4a017" letterSpacing="0.5">KÖNIG</text>
    </svg>
  )
}

export function FordLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 48" className={className} aria-label="Ford">
      <ellipse cx="60" cy="24" rx="50" ry="20" fill="#003399" />
      <text x="60" y="31" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="400" fill="#ffffff" fontStyle="italic">Ford</text>
    </svg>
  )
}

export function RosierLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 40" className={className} aria-label="Rosier">
      <text x="70" y="24" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="700" fill="#1a1a2e" letterSpacing="2">ROSIER</text>
      <text x="70" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="400" fill="#888" letterSpacing="0.5">Wir bewegen Menschen</text>
    </svg>
  )
}

export function VorallerLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 40" className={className} aria-label="Voraller">
      <text x="70" y="27" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="700" fill="#cc0000" letterSpacing="0.5">vor<tspan fill="#333">aller</tspan></text>
    </svg>
  )
}
