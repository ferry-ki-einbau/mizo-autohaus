import { Link } from 'react-router-dom'
import { Home, Phone } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-accent/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-primary mb-3">Seite nicht gefunden</h1>
        <p className="text-text-muted mb-8">
          Die gesuchte Seite existiert leider nicht. Vielleicht finden Sie was Sie suchen auf unserer Startseite.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors no-underline"
          >
            <Home className="w-5 h-5" />
            Zur Startseite
          </Link>
          <a
            href="tel:+4915161861808"
            className="flex items-center gap-2 border border-border hover:border-accent text-text-muted hover:text-primary px-6 py-3 rounded-xl font-semibold transition-colors no-underline"
          >
            <Phone className="w-5 h-5" />
            Anrufen
          </a>
        </div>
      </div>
    </div>
  )
}
