import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './Logo'

const navItems = [
  { label: 'Ankauf', href: '/#ankauf' },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Fahrzeuge', href: '/fahrzeuge' },
  { label: 'Online-Zulassung', href: '/online-zulassung' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
      return
    }
    navigate(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-all duration-300',
      scrolled ? 'border-border shadow-lg shadow-black/5' : 'border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Logo showTagline />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href === '/online-zulassung'
                ? location.pathname === '/online-zulassung'
                : item.href === '/kontakt'
                  ? location.pathname === '/kontakt'
                  : false

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-accent bg-accent/5'
                      : 'text-text-muted hover:text-primary hover:bg-bg-soft'
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+4915161861808"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors no-underline"
            >
              <Phone className="w-4 h-4" />
              0151 618 618 08
            </a>
            <button
              onClick={() => handleNavClick('/#ankauf')}
              className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Auto verkaufen
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 -mr-1 rounded-lg hover:bg-bg-soft transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Navigation umschalten"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-3 rounded-lg text-base font-medium text-text-muted hover:text-primary hover:bg-bg-soft transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+4915161861808"
              className="flex items-center gap-2 px-4 py-3 text-base text-text-muted no-underline"
            >
              <Phone className="w-5 h-5" />
              0151 618 618 08
            </a>
            <button
              onClick={() => handleNavClick('/#ankauf')}
              className="mt-2 bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-lg text-base font-bold text-center transition-colors"
            >
              Auto verkaufen
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
