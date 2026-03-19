/**
 * Google Sheets als kostenloses Fahrzeug-CMS
 *
 * Setup für den Kunden:
 * 1. Google Sheet anlegen mit diesen Spalten:
 *    Marke | Modell | Baujahr | Kilometerstand | Preis | Kraftstoff | Getriebe | Farbe | Beschreibung | Bild-URL | Verkauft
 *
 * 2. Datei → Im Web veröffentlichen → als CSV
 *
 * 3. Die URL hier eintragen (VITE_SHEETS_CSV_URL in .env)
 *
 * Der Kunde kann jederzeit Autos hinzufügen/entfernen.
 * Die Website lädt die Daten automatisch.
 */

export interface Fahrzeug {
  marke: string
  modell: string
  baujahr: string
  kilometerstand: string
  preis: string
  kraftstoff: string
  getriebe: string
  farbe: string
  beschreibung: string
  bildUrl: string
  verkauft: boolean
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false
  let row: string[] = []

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]
    const next = csv[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        row.push(current.trim())
        current = ''
      } else if (char === '\n' || (char === '\r' && next === '\n')) {
        row.push(current.trim())
        if (row.some(cell => cell.length > 0)) rows.push(row)
        row = []
        current = ''
        if (char === '\r') i++
      } else {
        current += char
      }
    }
  }
  // Last row
  row.push(current.trim())
  if (row.some(cell => cell.length > 0)) rows.push(row)

  return rows
}

export async function fetchFahrzeuge(csvUrl: string): Promise<Fahrzeug[]> {
  try {
    const res = await fetch(csvUrl)
    if (!res.ok) return []
    const text = await res.text()
    const rows = parseCSV(text)

    // Skip header row
    if (rows.length < 2) return []

    return rows.slice(1)
      .map(row => ({
        marke: row[0] || '',
        modell: row[1] || '',
        baujahr: row[2] || '',
        kilometerstand: row[3] || '',
        preis: row[4] || '',
        kraftstoff: row[5] || '',
        getriebe: row[6] || '',
        farbe: row[7] || '',
        beschreibung: row[8] || '',
        bildUrl: row[9] || '',
        verkauft: (row[10] || '').toLowerCase() === 'ja',
      }))
      .filter(fz => !fz.verkauft && fz.marke && fz.modell)
  } catch {
    return []
  }
}
