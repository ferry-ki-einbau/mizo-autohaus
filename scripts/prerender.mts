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
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  for (const route of routes) {
    console.log(`  Prerendering: ${route}`)

    const html = render(route)

    // Inject rendered HTML into the template
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    // Write to the correct path
    const filePath = route === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, `${route.slice(1)}.html`)

    // Create directory if needed (for nested routes)
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(filePath, finalHtml)
  }

  // Clean up server bundle (not needed on Vercel)
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true })

  console.log(`\n  ✅ ${routes.length} Routen prerendered!`)
}

prerender().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
