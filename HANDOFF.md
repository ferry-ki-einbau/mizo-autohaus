# HANDOFF — Mizo Autohaus — 2026-03-19

## Was wurde in dieser Session gebaut/geändert

### Komplette Website von Null aufgebaut:
- **Stack:** React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Branding:** Schwarz (#111) + Weiß + Gold (#C9A84C) — nach Kundenwunsch
- **SSG Prerendering:** entry-server.tsx + prerender.mts — 31 Routen prerendered
- **Hero:** KI-generiertes Bild (Drohnen-Shot, Autohaus bei Dämmerung, gemischte Autos)
- **Hero Mobile:** Gleiches Bild, object-bottom für Autoansicht
- **Logo:** Text-only "MIZO AUTOHAUS" (AUTOHAUS in Gold) — KI-Logo wurde verworfen

### Seiten & Komponenten:
- `src/components/Hero.tsx` — Cinematic Hero mit 2 CTAs (Formular + Telefon)
- `src/components/AnkaufForm.tsx` — Kompaktes Formular (1 Screen, keine Steps), Inline-Fehler, Submit immer aktiv, Erfolgs-Screen mit Tel+WhatsApp
- `src/components/Prozess.tsx` — 4 Schritte zum Verkauf (dunkler Hintergrund)
- `src/components/WhyUs.tsx` — 6 Gründe für Vertrauen
- `src/components/Bewertungen.tsx` — 8 echte Google-Bewertungen als Slider
- `src/components/Leistungen.tsx` — 6 Service-Karten
- `src/components/Fahrzeuge.tsx` — Dynamisch aus Vercel Blob API, Fallback "Wir suchen Ihr Auto"
- `src/components/FAQ.tsx` — 8 Fragen mit Accordion + Schema.org FAQ Markup
- `src/components/Partner.tsx` — Animierte Zähler + Partner-Logos Bild vom Kunden
- `src/components/UeberUns.tsx` — Werte + echte Hof-Fotos + Google Maps
- `src/components/CTABanner.tsx` — Finaler CTA (Formular primär, Telefon sekundär)
- `src/components/MobileCTA.tsx` — Sticky Bar Mobile (Anrufen + WhatsApp)
- `src/components/WhatsAppButton.tsx` — Floating Button Desktop
- `src/components/ScrollToTop.tsx` — Scroll-to-top Desktop
- `src/components/CookieConsent.tsx` — DSGVO Cookie Banner
- `src/components/ScrollRestoration.tsx` — Scroll-to-top bei Seitenwechsel
- `src/components/AnimatedCounter.tsx` — Zähler-Animation bei Scroll
- `src/components/TrustBadges.tsx` — Vertrauenssiegel unter Formular

### SEO Landing Pages (5 Service + 21 Stadt = 26 Unterseiten):
- `/auto-verkaufen-hannover` — Hauptseite Ankauf
- `/gebrauchtwagen-hannover` — Gebrauchtwagen kaufen
- `/unfallwagen-ankauf` — Nische: Unfallwagen
- `/kfz-finanzierung-hannover` — Finanzierung
- `/auto-bewertung-kostenlos` — Lead-Magnet
- `/auto-verkaufen/:stadt` — 21 Städte (Berlin, Hamburg, München, Köln, Frankfurt, Düsseldorf, Dortmund, Essen, Leipzig, Bremen, Dresden, Nürnberg, Hannover, Braunschweig, Wolfsburg, Hildesheim, Celle, Göttingen, Osnabrück, Oldenburg, Magdeburg)
- Jede Unterseite hat eigenes Hero-Bild + Ankauf-Formular direkt auf der Seite

### Backend:
- `api/send-form.ts` — Resend E-Mail (Händler + Kunden-Bestätigung)
- `api/admin/vehicles.ts` — CRUD Fahrzeuge (Vercel Blob)
- `api/admin/upload.ts` — Bildupload (Vercel Blob)
- `src/pages/AdminPage.tsx` — Passwort-geschütztes Fahrzeug-Admin-Panel

### SEO:
- Schema.org: AutoDealer + BreadcrumbList + FAQPage
- Meta Tags, OG Tags, Twitter Cards, OG Image (KI-generiert)
- Sitemap.xml (31 URLs), robots.txt
- Geo Meta Tags (Hannover, Niedersachsen)
- SSG Prerendering aller 31 Routen
- Favicon SVG + Apple Touch Icon + Web Manifest

### Security:
- Vercel _headers (CSP, HSTS, X-Frame-Options)
- Honeypot Anti-Spam in allen Formularen
- HTML Escaping in E-Mails

## Aktueller Stand
- Build: ✅ Grün — 31 Routen prerendered
- Tests: Keine automatisierten Tests
- Deployed: ❌ Nein — nur lokal (Dev Server auf localhost:5177)

## Nächster Schritt (konkret)

> **Mobile-Optimierung + Performance + SEO Feinschliff:**
> 1. Mobile Version durchgehen: Padding, Overflow, Touch-Targets, Schriftgrößen prüfen/fixen
> 2. Performance: Hero-Bilder zu WebP konvertieren + resize (sharp), Font Preloads optimieren, Bundle analysieren
> 3. SEO: Jede Unterseite braucht eigene Meta-Tags (title, description) — aktuell nur Startseite hat sie
> 4. Lighthouse Score prüfen + auf 95+ Mobile optimieren
> 5. Danach: GitHub Repo erstellen, Vercel deployen, Env Vars setzen

## Wichtige Entscheidungen die getroffen wurden
- **Kein Supabase** — Vercel API + Resend + Vercel Blob stattdessen (kostenlos)
- **Kein Telegram** — nur E-Mail-Benachrichtigung
- **"Sofortauszahlung" statt "Barauszahlung"** — Finanzamt-freundlicher
- **Preisvorstellung-Feld entfernt** — schreckt Verkäufer ab (CRO Audit)
- **Submit-Button immer aktiv** — mit Inline-Fehlern statt disabled state
- **SSG Prerendering Pflicht** — React SPA = leeres HTML für Google
- **Stuttgart-Unterseite entfernt** — Ferry hat dort bereits eigene Projekte
- **Kein Logo-Bild** — Text-only "MIZO AUTOHAUS" da KI-Logos nicht dem Original entsprachen
- **Schwarz-Weiß-Gold Branding** — Kundenwunsch (nicht Rot wie zwischenzeitlich versucht)

## Was NICHT angefasst werden soll
- `api/send-form.ts` — E-Mail-System ist fertig und getestet
- `api/admin/` — Admin-API ist fertig
- SEO Schema.org in `index.html` — ist korrekt konfiguriert
- `public/images/hero-autohaus.jpg` — Kunde hat dieses Hero-Bild approved
