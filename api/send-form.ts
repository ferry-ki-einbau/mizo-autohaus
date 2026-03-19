import type { VercelRequest, VercelResponse } from '@vercel/node'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const ROW = (label: string, value: string) =>
  `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:600;color:#1a1a2e;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#333;">${value}</td></tr>`

async function sendEmail(apiKey: string, from: string, to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to, subject, html }),
  })
  if (!res.ok) {
    const errText = await res.text()
    console.error('Resend error:', errText)
    throw new Error('Email failed')
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid body' })
  if (body.website) return res.status(200).json({ success: true }) // Honeypot

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const DEALER_EMAIL = 'info@mizo-autohaus.de'
  const FROM_EMAIL = 'Mizo Autohaus <noreply@mizo-autohaus.ki-einbau.de>'

  // ============================================================
  // ANKAUF-ANFRAGE
  // ============================================================
  if (body.type === 'ankauf') {
    const fahrzeug = `${esc(body.marke || '')} ${esc(body.modell || '')}`

    // --- E-Mail 1: An den Händler (KRITISCH) ---
    const dealerSubject = `🚗 Neue Ankauf-Anfrage: ${fahrzeug}`
    const dealerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1a1a2e;padding:20px 24px;border-radius:12px 12px 0 0;">
          <h2 style="color:#C9A84C;margin:0;font-size:20px;">Neue Fahrzeug-Ankauf-Anfrage</h2>
          <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:14px;">Eingegangen am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</p>
        </div>
        <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;">
          <table style="border-collapse:collapse;width:100%;">
            <tr><td colspan="2" style="padding:12px;background:#f8f8f8;font-weight:700;color:#1a1a2e;font-size:15px;">📋 Fahrzeugdaten</td></tr>
            ${ROW('Fahrzeug', fahrzeug)}
            ${ROW('Baujahr', esc(body.baujahr || '-'))}
            ${ROW('Kilometerstand', body.kilometerstand ? `${Number(body.kilometerstand).toLocaleString('de-DE')} km` : '-')}
            ${ROW('Kraftstoff', esc(body.kraftstoff || '-'))}
            ${ROW('Getriebe', esc(body.getriebe || '-'))}
            ${ROW('Leistung', body.leistungPs ? `${esc(body.leistungPs)} PS` : '-')}
            ${ROW('Farbe', esc(body.farbe || '-'))}
            ${ROW('Zustand', esc(body.zustand || '-'))}
            ${ROW('TÜV', esc(body.tuev || '-'))}
            ${ROW('💰 Preisvorstellung', `<strong style="color:#C9A84C;font-size:16px;">${esc(body.preisvorstellung || 'Keine Angabe')}</strong>`)}
            ${body.beschreibung ? ROW('Beschreibung', esc(body.beschreibung)) : ''}
            ${ROW('Fotos', `${body.bilder?.length || 0} Bild(er) angehängt`)}
            <tr><td colspan="2" style="padding:12px;background:#f8f8f8;font-weight:700;color:#1a1a2e;font-size:15px;">👤 Kontaktdaten</td></tr>
            ${ROW('Name', `<strong>${esc(body.name || '')}</strong>`)}
            ${ROW('Telefon', `<a href="tel:${esc(body.telefon || '')}" style="color:#C9A84C;font-weight:600;font-size:16px;">${esc(body.telefon || '')}</a>`)}
            ${ROW('E-Mail', esc(body.email || '-'))}
            ${ROW('Erreichbar', esc(body.erreichbarkeit || 'Keine Angabe'))}
          </table>
        </div>
      </div>
    `

    // Händler-Email MUSS durchgehen
    try {
      await sendEmail(RESEND_API_KEY, FROM_EMAIL, DEALER_EMAIL, dealerSubject, dealerHtml)
    } catch (err) {
      console.error('Dealer email failed:', err)
      return res.status(500).json({ error: 'Email sending failed' })
    }

    // --- E-Mail 2: Bestätigung an den Kunden (nice-to-have) ---
    if (body.email) {
      const kundenHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1a1a2e;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">MIZO <span style="color:#C9A84C;">AUTOHAUS</span></h1>
            <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:13px;">Ihr Partner für Mobilität und Vertrauen</p>
          </div>
          <div style="border:1px solid #eee;border-top:3px solid #C9A84C;padding:32px 24px;border-radius:0 0 12px 12px;">
            <h2 style="color:#1a1a2e;margin:0 0 8px;font-size:20px;">Vielen Dank für Ihre Anfrage, ${esc(body.name || '')}!</h2>
            <p style="color:#666;line-height:1.7;margin:0 0 20px;">
              Wir haben Ihre Anfrage für Ihren <strong style="color:#1a1a2e;">${fahrzeug}</strong> erhalten und werden diese schnellstmöglich bearbeiten.
            </p>

            <div style="background:#f8f8f8;border-radius:8px;padding:16px 20px;margin:0 0 20px;">
              <h3 style="color:#1a1a2e;margin:0 0 8px;font-size:15px;">📋 Ihre Angaben</h3>
              <p style="color:#666;margin:0;font-size:14px;line-height:1.6;">
                ${fahrzeug}, Baujahr ${esc(body.baujahr || '-')}, ${body.kilometerstand ? `${Number(body.kilometerstand).toLocaleString('de-DE')} km` : '-'}
                ${body.kraftstoff ? `, ${esc(body.kraftstoff)}` : ''}
                ${body.getriebe ? `, ${esc(body.getriebe)}` : ''}
              </p>
              ${body.preisvorstellung ? `<p style="color:#C9A84C;margin:8px 0 0;font-weight:600;">Preisvorstellung: ${esc(body.preisvorstellung)}</p>` : ''}
            </div>

            <div style="background:#f0fdf4;border-left:3px solid #10b981;border-radius:4px;padding:14px 16px;margin:0 0 20px;">
              <p style="color:#166534;margin:0;font-size:14px;line-height:1.6;">
                <strong>So geht's weiter:</strong> Wir prüfen Ihre Angaben und melden uns innerhalb von <strong>24 Stunden</strong> mit einem fairen Angebot bei Ihnen.
              </p>
            </div>

            <p style="color:#999;font-size:13px;line-height:1.6;margin:0 0 20px;">
              Sollten wir uns nicht innerhalb von 48 Stunden bei Ihnen melden, konnten wir Ihnen leider kein passendes Angebot unterbreiten.
              In diesem Fall empfehlen wir Ihnen, weitere Händler in Ihrer Region zu kontaktieren.
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

            <p style="color:#666;font-size:14px;margin:0;">
              <strong>Fragen?</strong> Rufen Sie uns gerne an:<br />
              📞 <a href="tel:+4915161861808" style="color:#C9A84C;font-weight:600;">0151 618 618 08</a><br />
              📧 <a href="mailto:info@mizo-autohaus.de" style="color:#C9A84C;">info@mizo-autohaus.de</a>
            </p>

            <p style="color:#999;font-size:12px;margin:20px 0 0;">
              Mizo Autohaus · Vahrenwalder Str. 35 · 30165 Hannover<br />
              Mo–Fr 09:00–18:00 · Sa 09:00–16:00
            </p>
          </div>
        </div>
      `
      try {
        await sendEmail(RESEND_API_KEY, FROM_EMAIL, body.email, `Ihre Ankauf-Anfrage bei Mizo Autohaus — ${fahrzeug}`, kundenHtml)
      } catch {
        // Non-critical — don't fail the request
        console.error('Customer confirmation email failed')
      }
    }

    return res.status(200).json({ success: true })
  }

  // ============================================================
  // ZULASSUNG
  // ============================================================
  if (body.type === 'zulassung') {
    const dealerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2 style="color:#C9A84C;">Neue Zulassungs-Anfrage</h2>
        <table style="border-collapse:collapse;width:100%;">
          ${ROW('Art', esc(body.art || ''))}
          ${ROW('Kennzeichen', esc(body.kennzeichen || '-'))}
          ${ROW('Fahrzeug', esc(body.fahrzeug || '-'))}
          ${ROW('Name', esc(body.name || ''))}
          ${ROW('Telefon', `<a href="tel:${esc(body.telefon || '')}">${esc(body.telefon || '')}</a>`)}
          ${ROW('E-Mail', esc(body.email || '-'))}
          ${ROW('Nachricht', esc(body.nachricht || '-'))}
        </table>
      </div>
    `
    try {
      await sendEmail(RESEND_API_KEY, FROM_EMAIL, DEALER_EMAIL, `📋 Zulassungs-Anfrage: ${esc(body.art || '')}`, dealerHtml)
    } catch {
      return res.status(500).json({ error: 'Email sending failed' })
    }

    // Kunden-Bestätigung
    if (body.email) {
      try {
        await sendEmail(RESEND_API_KEY, FROM_EMAIL, body.email, 'Ihre Zulassungs-Anfrage bei Mizo Autohaus', `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1a1a2e;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="color:white;margin:0;font-size:22px;">MIZO <span style="color:#C9A84C;">AUTOHAUS</span></h1>
            </div>
            <div style="border:1px solid #eee;border-top:3px solid #C9A84C;padding:32px 24px;border-radius:0 0 12px 12px;">
              <h2 style="color:#1a1a2e;margin:0 0 12px;">Danke für Ihre Anfrage, ${esc(body.name || '')}!</h2>
              <p style="color:#666;line-height:1.7;">Wir haben Ihre Zulassungs-Anfrage erhalten und melden uns kurzfristig bei Ihnen.</p>
              <p style="color:#666;font-size:14px;margin:16px 0 0;">📞 <a href="tel:+4915161861808" style="color:#C9A84C;font-weight:600;">0151 618 618 08</a></p>
              <p style="color:#999;font-size:12px;margin:20px 0 0;">Mizo Autohaus · Vahrenwalder Str. 35 · 30165 Hannover</p>
            </div>
          </div>
        `)
      } catch { /* non-critical */ }
    }

    return res.status(200).json({ success: true })
  }

  // ============================================================
  // KONTAKT
  // ============================================================
  const dealerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h2 style="color:#C9A84C;">Neue Kontakt-Anfrage</h2>
      <table style="border-collapse:collapse;width:100%;">
        ${ROW('Name', esc(body.name || ''))}
        ${ROW('Telefon', `<a href="tel:${esc(body.telefon || '')}">${esc(body.telefon || '')}</a>`)}
        ${ROW('E-Mail', esc(body.email || '-'))}
        ${ROW('Nachricht', esc(body.nachricht || '-'))}
      </table>
    </div>
  `
  try {
    await sendEmail(RESEND_API_KEY, FROM_EMAIL, DEALER_EMAIL, `✉️ Kontakt-Anfrage von ${esc(body.name || 'Unbekannt')}`, dealerHtml)
  } catch {
    return res.status(500).json({ error: 'Email sending failed' })
  }

  // Kunden-Bestätigung
  if (body.email) {
    try {
      await sendEmail(RESEND_API_KEY, FROM_EMAIL, body.email, 'Ihre Nachricht an Mizo Autohaus', `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1a1a2e;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">MIZO <span style="color:#C9A84C;">AUTOHAUS</span></h1>
          </div>
          <div style="border:1px solid #eee;border-top:3px solid #C9A84C;padding:32px 24px;border-radius:0 0 12px 12px;">
            <h2 style="color:#1a1a2e;margin:0 0 12px;">Danke für Ihre Nachricht, ${esc(body.name || '')}!</h2>
            <p style="color:#666;line-height:1.7;">Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.</p>
            <p style="color:#666;font-size:14px;margin:16px 0 0;">📞 <a href="tel:+4915161861808" style="color:#C9A84C;font-weight:600;">0151 618 618 08</a></p>
            <p style="color:#999;font-size:12px;margin:20px 0 0;">Mizo Autohaus · Vahrenwalder Str. 35 · 30165 Hannover</p>
          </div>
        </div>
      `)
    } catch { /* non-critical */ }
  }

  return res.status(200).json({ success: true })
}

export const config = {
  api: { bodyParser: { sizeLimit: '25mb' } },
}
