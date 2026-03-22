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

  // Remove render-blocking <link rel="stylesheet"> for main CSS
  template = template.replace(
    /<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">\n?/g,
    ''
  )
  // Add onload + noscript fallback to Vite's existing preload tag
  template = template.replace(
    /<link rel="preload" as="style" href="(\/assets\/index-[^"]+\.css)">/,
    (_match: string, href: string) =>
      `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
  )

  for (const route of routes) {
    console.log(`  Prerendering: ${route}`)

    const html = render(route)

    // Inject rendered HTML into the template
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

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
