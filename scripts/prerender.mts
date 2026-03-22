/**
 * SSG Prerendering — rendert alle Routen zu statischem HTML
 * Google sieht echten Content statt leeres <div id="root"></div>
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

// Alle Routen die prerendered werden sollen
const stadtRouten = [
  // Großstädte deutschlandweit
  'berlin', 'hamburg', 'muenchen', 'koeln', 'frankfurt',
  'duesseldorf', 'dortmund', 'leipzig', 'bremen', 'dresden',
  'nuernberg', 'essen',
  // Regional um Hannover
  'hannover', 'braunschweig', 'wolfsburg', 'hildesheim',
  'celle', 'goettingen', 'osnabrueck', 'oldenburg', 'magdeburg',
]

const stadtNamen: Record<string, string> = {
  berlin: 'Berlin', hamburg: 'Hamburg', muenchen: 'München', koeln: 'Köln',
  frankfurt: 'Frankfurt', duesseldorf: 'Düsseldorf', dortmund: 'Dortmund',
  leipzig: 'Leipzig', bremen: 'Bremen', dresden: 'Dresden', nuernberg: 'Nürnberg',
  essen: 'Essen', hannover: 'Hannover', braunschweig: 'Braunschweig',
  wolfsburg: 'Wolfsburg', hildesheim: 'Hildesheim', celle: 'Celle',
  goettingen: 'Göttingen', osnabrueck: 'Osnabrück', oldenburg: 'Oldenburg',
  magdeburg: 'Magdeburg',
}

// Pro-Route Meta: [title, description]
const routeMeta: Record<string, [string, string]> = {
  '/': ['Mizo Autohaus Hannover | Fahrzeug-Ankauf & Verkauf | Faire Preise', 'Mizo Autohaus Hannover — Fahrzeug-Ankauf, Verkauf, Finanzierung & Zulassung. Faire Preise, Sofortauszahlung. Jetzt Fahrzeug bewerten!'],
  '/online-zulassung': ['Online-Zulassung Hannover in 10 Min | Mizo Autohaus', 'Online-Zulassung in Hannover — Neuzulassung, Ummeldung oder Abmeldung in nur 10 Minuten. Kein Warten bei der Zulassungsstelle. Mizo Autohaus erledigt alles.'],
  '/kontakt': ['Kontakt | Mizo Autohaus Hannover', 'Kontaktieren Sie Mizo Autohaus in Hannover. Vahrenwalder Str. 35, 30165 Hannover. Tel: 01516 1861808. Mo–Fr 09–18 Uhr, Sa 09–16 Uhr.'],
  '/impressum': ['Impressum | Mizo Autohaus Hannover', 'Impressum der Carmove Logistik GmbH — Mizo Autohaus Hannover.'],
  '/datenschutz': ['Datenschutz | Mizo Autohaus Hannover', 'Datenschutzerklärung von Mizo Autohaus Hannover — Carmove Logistik GmbH.'],
  '/fahrzeuge': ['Fahrzeuge kaufen in Hannover | Mizo Autohaus', 'Gebrauchtwagen kaufen bei Mizo Autohaus in Hannover. Faire Preise, geprüfte Fahrzeuge mit Garantie. Finanzierung möglich.'],
  '/auto-verkaufen-hannover': ['Auto verkaufen Hannover | Sofortankauf | Mizo Autohaus', 'Auto verkaufen in Hannover — Mizo Autohaus kauft Ihr Fahrzeug sofort an. Faire Bewertung, Sofortauszahlung, kostenlose Abmeldung. Vahrenwalder Str. 35.'],
  '/gebrauchtwagen-hannover': ['Gebrauchtwagen Hannover kaufen & verkaufen | Mizo Autohaus', 'Gebrauchtwagen in Hannover — Ankauf und Verkauf aller Marken bei Mizo Autohaus. Faire Preise, Finanzierung möglich, Garantie inklusive.'],
  '/unfallwagen-ankauf': ['Unfallwagen Ankauf deutschlandweit | Mizo Autohaus', 'Unfallwagen verkaufen — Mizo Autohaus kauft Unfallfahrzeuge, Totalschäden und Fahrzeuge ohne TÜV deutschlandweit an. Faire Bewertung, Sofortauszahlung.'],
  '/kfz-finanzierung-hannover': ['Kfz-Finanzierung Hannover | Mizo Autohaus', 'Kfz-Finanzierung in Hannover — flexible Raten, auch für Selbstständige. Mizo Autohaus findet die passende Lösung für Ihr Budget. Schnelle Zusage.'],
  '/auto-bewertung-kostenlos': ['Kostenlose Auto-Bewertung | Mizo Autohaus Hannover', 'Kostenlosen Auto-Bewertung bei Mizo Autohaus in Hannover. Faire Marktbewertung innerhalb von 24 Stunden — unverbindlich und ohne Verpflichtung.'],
}

// Stadt-Pages Meta automatisch generieren
for (const slug of stadtRouten) {
  const name = stadtNamen[slug] || slug
  routeMeta[`/auto-verkaufen/${slug}`] = [
    `Auto verkaufen in ${name} | Mizo Autohaus Hannover`,
    `Auto verkaufen in ${name} — Mizo Autohaus kauft Ihr Fahrzeug an. Faire Bewertung, Sofortauszahlung, kostenlose Abholung. Deutschlandweiter Ankauf aller Marken.`,
  ]
}

const routes = [
  '/',
  '/online-zulassung',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/fahrzeuge',
  // SEO Landing Pages
  '/auto-verkaufen-hannover',
  '/gebrauchtwagen-hannover',
  '/unfallwagen-ankauf',
  '/kfz-finanzierung-hannover',
  '/auto-bewertung-kostenlos',
  // Stadt-Landing-Pages (deutschlandweit)
  ...stadtRouten.map(s => `/auto-verkaufen/${s}`),
  // /admin wird NICHT prerendered (braucht kein SEO)
]

async function prerender() {
  // Load the SSR bundle
  const { render } = await import(path.resolve(distDir, 'server/entry-server.js'))

  // Read the template HTML
  let template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  // Keep the stylesheet link — Vite generates it correctly

  for (const route of routes) {
    console.log(`  Prerendering: ${route}`)

    const html = render(route)

    // Inject rendered HTML into the template
    let finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    // Canonical URL pro Route korrigieren (Template hat immer /)
    const canonicalUrl = `https://mizo-autohaus.de${route}`
    finalHtml = finalHtml.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )

    // OG URL pro Route korrigieren
    finalHtml = finalHtml.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )

    // Title + Description pro Route injizieren (falls definiert)
    const [pageTitle, pageDesc] = routeMeta[route] || []
    if (pageTitle) {
      finalHtml = finalHtml.replace(
        /<title>[^<]*<\/title>/,
        `<title>${pageTitle}</title>`
      )
      finalHtml = finalHtml.replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${pageDesc}" />`
      )
      finalHtml = finalHtml.replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${pageTitle}" />`
      )
      finalHtml = finalHtml.replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${pageDesc}" />`
      )
    }

    // Write to dist/{route}/index.html for correct SPA routing
    const routePath = route === '/' ? '' : route
    const outDir = path.resolve(distDir, routePath.slice(1))
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    fs.writeFileSync(path.resolve(outDir, 'index.html'), finalHtml)
  }

  // Clean up server bundle (not needed on Vercel)
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true })

  console.log(`\n  ✅ ${routes.length} Routen prerendered!`)
}

prerender().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
