import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Car, FileText, Tag, Shield, CreditCard,
  ChevronRight, ChevronLeft, Check, Loader2, AlertCircle, Info
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Honeypot
  website: string
  // Step 1 — Halterdaten
  anrede: string
  vorname: string
  nachname: string
  strasse: string
  plz: string
  ort: string
  land: string
  email: string
  telefon: string
  // Step 2 — Unterlagen (checkboxes)
  hatAusweis: boolean
  hatFahrzeugbrief: boolean
  // Step 3 — Fahrzeugtyp & Vorgang
  fahrzeugtyp: string
  vorgang: string
  // Step 4 — Fahrzeugdaten
  fin: string
  keinePruefziffer: boolean
  pruefziffer: string
  fahrzeugscheinnummer: string
  sicherheitscodeI: string
  sicherheitscode: string
  fahrzeugbriefnummer: string
  // Step 5 — Kennzeichen
  kennzeichenOption: string // 'reserviert' | 'reservieren' | 'zufaellig'
  wunschkennzeichen: string
  elektrokennzeichen: boolean
  saisonkennzeichen: boolean
  reservierungspin: string
  kennzeichenLieferung: string // 'ja' | 'nein'
  nummernschild: string
  umweltplakette: string // 'ja' | 'nein'
  // Step 6 — Versicherung & IBAN
  versicherungOption: string // 'evb' | 'vorhanden' | 'keine'
  evbNummer: string
  iban: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls = 'w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-[#0a0a0a] focus:border-[#E31937] focus:ring-1 focus:ring-[#E31937] outline-none transition-colors text-sm'
const labelCls = 'block text-sm font-medium text-[#0a0a0a] mb-1.5'

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input {...props} className={inputCls} />
    </div>
  )
}

function RadioCard({
  checked, onChange, label, sublabel
}: { checked: boolean; onChange: () => void; label: string; sublabel?: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
        checked
          ? 'border-[#E31937] bg-[#E31937]/5 text-[#0a0a0a]'
          : 'border-[#eee] hover:border-[#ddd] text-[#52525b]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
          checked ? 'border-[#E31937]' : 'border-[#ccc]'
        }`}>
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#E31937]" />}
        </div>
        <div>
          <div className="font-medium">{label}</div>
          {sublabel && <div className="text-xs text-[#a1a1aa] mt-0.5">{sublabel}</div>}
        </div>
      </div>
    </button>
  )
}

function CheckCard({
  checked, onChange, label
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm flex items-center gap-3 ${
        checked ? 'border-[#10b981] bg-[#10b981]/5' : 'border-[#eee] hover:border-[#ddd]'
      }`}
    >
      <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
        checked ? 'border-[#10b981] bg-[#10b981]' : 'border-[#ccc]'
      }`}>
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className="font-medium text-[#0a0a0a]">{label}</span>
    </button>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700">
      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}

// ─── Step Config ─────────────────────────────────────────────────────────────

const STEPS = [
  { icon: User,       label: 'Kontakt' },
  { icon: FileText,   label: 'Unterlagen' },
  { icon: Car,        label: 'Fahrzeug' },
  { icon: FileText,   label: 'Fahrzeugdaten' },
  { icon: Tag,        label: 'Kennzeichen' },
  { icon: Shield,     label: 'Versicherung' },
  { icon: CreditCard, label: 'Bank & Senden' },
]

const INITIAL: FormData = {
  website: '',
  anrede: '', vorname: '', nachname: '',
  strasse: '', plz: '', ort: '', land: 'Deutschland',
  email: '', telefon: '',
  hatAusweis: false, hatFahrzeugbrief: false,
  fahrzeugtyp: '', vorgang: '',
  fin: '', keinePruefziffer: false, pruefziffer: '',
  fahrzeugscheinnummer: '', sicherheitscodeI: '',
  sicherheitscode: '', fahrzeugbriefnummer: '',
  kennzeichenOption: '', wunschkennzeichen: '',
  elektrokennzeichen: false, saisonkennzeichen: false,
  reservierungspin: '', kennzeichenLieferung: '',
  nummernschild: '', umweltplakette: '',
  versicherungOption: '', evbNummer: '', iban: '',
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ZulassungForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof FormData, value: string | boolean) =>
    setData(d => ({ ...d, [field]: value }))

  // ─── Validation per step ───────────────────────────────────────────────────

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!(data.anrede && data.vorname && data.nachname && data.strasse && data.plz && data.ort && data.email && data.telefon)
      case 1:
        return data.hatAusweis && data.hatFahrzeugbrief
      case 2:
        return !!(data.fahrzeugtyp && data.vorgang)
      case 3:
        return !!(data.fin.length === 17 && (data.keinePruefziffer || data.pruefziffer) && data.fahrzeugscheinnummer && data.sicherheitscodeI && data.sicherheitscode && data.fahrzeugbriefnummer)
      case 4:
        return !!(data.kennzeichenOption && data.kennzeichenLieferung && data.umweltplakette)
      case 5:
        return !!(data.versicherungOption && (data.versicherungOption !== 'evb' || data.evbNummer))
      case 6:
        return !!(data.iban.length >= 15)
      default: return true
    }
  }

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (data.website || submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'zulassung_detail', ...data }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.')
      }
    } catch {
      setError('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.')
    }
    setSubmitting(false)
  }

  // ─── Success ───────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-10 shadow-lg text-center"
      >
        <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-[#10b981]" />
        </div>
        <h3 className="text-2xl font-bold text-[#0a0a0a] mb-3">Antrag erfolgreich gesendet!</h3>
        <p className="text-[#52525b] mb-2">Wir bearbeiten Ihren Antrag und melden uns kurzfristig bei Ihnen.</p>
        <p className="text-sm text-[#a1a1aa]">Eine Bestätigungs-E-Mail wurde an <strong>{data.email}</strong> gesendet.</p>
        <a
          href="tel:+4915161861808"
          className="inline-flex items-center gap-2 mt-6 bg-[#E31937] text-white px-6 py-3 rounded-xl font-semibold text-sm"
        >
          📞 0151 618 618 08
        </a>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} value={data.website} onChange={e => set('website', e.target.value)} />
      </div>

      {/* Progress bar */}
      <div className="bg-[#f7f7f8] px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#52525b]">Schritt {step + 1} von {STEPS.length}</span>
          <span className="text-xs font-medium text-[#E31937]">{STEPS[step].label}</span>
        </div>
        <div className="h-1.5 bg-[#eee] rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-[#E31937] rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step icons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 scrollbar-none">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = i < step
            const active = i === step
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  done ? 'bg-[#10b981]' : active ? 'bg-[#E31937]' : 'bg-[#eee]'
                }`}>
                  {done
                    ? <Check className="w-4 h-4 text-white" />
                    : <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#a1a1aa]'}`} />
                  }
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-4 transition-colors ${i < step ? 'bg-[#10b981]' : 'bg-[#eee]'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── Step 0: Halterdaten ─────────────────────────────────────── */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0a0a0a]">Kontakt & Halterdaten</h3>

                <div>
                  <label className={labelCls}>Anrede *</label>
                  <div className="flex gap-3">
                    {['Herr', 'Frau'].map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => set('anrede', a)}
                        className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                          data.anrede === a
                            ? 'border-[#E31937] bg-[#E31937]/5 text-[#E31937]'
                            : 'border-[#eee] text-[#52525b] hover:border-[#ddd]'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input label="Vorname *" value={data.vorname} onChange={e => set('vorname', e.target.value)} placeholder="Max" />
                  <Input label="Nachname *" value={data.nachname} onChange={e => set('nachname', e.target.value)} placeholder="Mustermann" />
                </div>

                <Input label="Straße und Hausnummer *" value={data.strasse} onChange={e => set('strasse', e.target.value)} placeholder="Musterstraße 1" />

                <div className="grid grid-cols-2 gap-3">
                  <Input label="PLZ *" value={data.plz} onChange={e => set('plz', e.target.value)} placeholder="30159" maxLength={5} />
                  <Input label="Ort *" value={data.ort} onChange={e => set('ort', e.target.value)} placeholder="Hannover" />
                </div>

                <div>
                  <label className={labelCls}>Land</label>
                  <select
                    value={data.land}
                    onChange={e => set('land', e.target.value)}
                    aria-label="Land"
                    className={inputCls}
                  >
                    <option>Deutschland</option>
                    <option>Österreich</option>
                    <option>Schweiz</option>
                  </select>
                </div>

                <Input label="E-Mail Adresse *" type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="info@beispiel.de" />
                <Input label="Handynummer *" type="tel" value={data.telefon} onChange={e => set('telefon', e.target.value)} placeholder="0151 1234567" />
              </div>
            )}

            {/* ── Step 1: Unterlagen ──────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0a0a0a]">Benötigte Unterlagen</h3>
                <p className="text-sm text-[#52525b]">Bitte bestätigen Sie, dass folgende Unterlagen vorliegen:</p>
                <CheckCard
                  checked={data.hatAusweis}
                  onChange={() => set('hatAusweis', !data.hatAusweis)}
                  label="Gültiger Personalausweis oder Reisepass"
                />
                <CheckCard
                  checked={data.hatFahrzeugbrief}
                  onChange={() => set('hatFahrzeugbrief', !data.hatFahrzeugbrief)}
                  label="Fahrzeugbrief (Zulassungsbescheinigung Teil II)"
                />
                {(!data.hatAusweis || !data.hatFahrzeugbrief) && (
                  <div className="flex gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100 text-xs text-amber-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>Beide Unterlagen müssen vorliegen um die Zulassung durchführen zu können.</div>
                  </div>
                )}
              </div>
            )}

            {/* ── Step 2: Fahrzeugtyp & Vorgang ──────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Welches Fahrzeug soll zugelassen werden?</h3>
                  {[
                    { val: 'PKW/LKW/Wohnmobil', label: 'PKW, LKW, Wohnmobil' },
                    { val: 'Motorrad', label: 'Motorrad, Leichtkraftrad, Quad unter 15 PS' },
                    { val: 'Anhänger', label: 'Anhänger' },
                    { val: 'Traktor', label: 'Traktor, Quad über 15 PS' },
                  ].map(o => (
                    <RadioCard
                      key={o.val}
                      checked={data.fahrzeugtyp === o.val}
                      onChange={() => set('fahrzeugtyp', o.val)}
                      label={o.label}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Welchen Vorgang möchten Sie durchführen?</h3>
                  <RadioCard
                    checked={data.vorgang === 'Neufahrzeug'}
                    onChange={() => set('vorgang', 'Neufahrzeug')}
                    label="Neufahrzeug zulassen"
                  />
                  <RadioCard
                    checked={data.vorgang === 'Gebrauchtwagen'}
                    onChange={() => set('vorgang', 'Gebrauchtwagen')}
                    label="Gebrauchtwagen zulassen"
                  />
                </div>
              </div>
            )}

            {/* ── Step 3: Fahrzeugdaten ───────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0a0a0a]">Fahrzeugdaten</h3>

                <div>
                  <Input
                    label="FIN (Fahrzeug-Identifizierungsnummer, 17-stellig) *"
                    value={data.fin}
                    onChange={e => set('fin', e.target.value.toUpperCase())}
                    placeholder="WBA12345678901234"
                    maxLength={17}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-[#a1a1aa]">Die FIN befindet sich im Fahrzeugbrief in Feld E</span>
                    <span className={`text-xs ${data.fin.length === 17 ? 'text-[#10b981]' : 'text-[#a1a1aa]'}`}>
                      {data.fin.length}/17
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-[#0a0a0a]">Prüfziffer</label>
                    <button
                      type="button"
                      onClick={() => set('keinePruefziffer', !data.keinePruefziffer)}
                      className="text-xs text-[#52525b] flex items-center gap-1"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${data.keinePruefziffer ? 'border-[#E31937] bg-[#E31937]' : 'border-[#ccc]'}`}>
                        {data.keinePruefziffer && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      Mein Fahrzeugschein enthält keine Prüfziffer
                    </button>
                  </div>
                  {!data.keinePruefziffer && (
                    <input
                      value={data.pruefziffer}
                      onChange={e => set('pruefziffer', e.target.value)}
                      placeholder="Prüfziffer aus Feld 3"
                      className={inputCls}
                    />
                  )}
                  <InfoBox>Die Prüfziffer befindet sich direkt neben der FIN in Feld 3 des Fahrzeugbriefes.</InfoBox>
                </div>

                <div>
                  <Input
                    label="Fahrzeugscheinnummer *"
                    value={data.fahrzeugscheinnummer}
                    onChange={e => set('fahrzeugscheinnummer', e.target.value)}
                    placeholder="Dokumentennummer eingeben"
                  />
                  <InfoBox>Die Fahrzeugscheinnummer (Dokumentennummer) befindet sich oben rechts auf der Zulassungsbescheinigung Teil I.</InfoBox>
                </div>

                <div>
                  <Input
                    label="Sicherheitscode Zulassungsbescheinigung Teil I *"
                    value={data.sicherheitscodeI}
                    onChange={e => set('sicherheitscodeI', e.target.value)}
                    placeholder="Sicherheitscode Teil I"
                  />
                  <InfoBox>Der Sicherheitscode befindet sich unter der Klebefolie auf der Rückseite des Fahrzeugscheins (Zulassungsbescheinigung Teil I).</InfoBox>
                </div>

                <div>
                  <Input
                    label="Sicherheitscode Zulassungsbescheinigung Teil II *"
                    value={data.sicherheitscode}
                    onChange={e => set('sicherheitscode', e.target.value)}
                    placeholder="Sicherheitscode Teil II"
                  />
                  <InfoBox>Der Sicherheitscode befindet sich unter der Klebefolie auf der Vorderseite des Fahrzeugbriefes (Zulassungsbescheinigung Teil II).</InfoBox>
                </div>

                <Input
                  label="Fahrzeugbriefnummer *"
                  value={data.fahrzeugbriefnummer}
                  onChange={e => set('fahrzeugbriefnummer', e.target.value)}
                  placeholder="Fahrzeugbriefnummer"
                />
              </div>
            )}

            {/* ── Step 4: Kennzeichen ─────────────────────────────────────── */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Wunschkennzeichen</h3>
                  {[
                    { val: 'reserviert', label: 'Ich habe bereits ein Wunschkennzeichen reserviert' },
                    { val: 'reservieren', label: 'Ich möchte ein Wunschkennzeichen reservieren' },
                    { val: 'zufaellig', label: 'Ich möchte ein zufälliges Kennzeichen erhalten' },
                  ].map(o => (
                    <RadioCard
                      key={o.val}
                      checked={data.kennzeichenOption === o.val}
                      onChange={() => set('kennzeichenOption', o.val)}
                      label={o.label}
                    />
                  ))}
                </div>

                {data.kennzeichenOption && data.kennzeichenOption !== 'zufaellig' && (
                  <div className="space-y-3">
                    <Input
                      label="Ihr Wunschkennzeichen"
                      value={data.wunschkennzeichen}
                      onChange={e => set('wunschkennzeichen', e.target.value.toUpperCase())}
                      placeholder="H AB 1234"
                    />
                    {data.kennzeichenOption === 'reserviert' && (
                      <Input
                        label="Reservierungspin"
                        value={data.reservierungspin}
                        onChange={e => set('reservierungspin', e.target.value)}
                        placeholder="PIN aus der Reservierungsbestätigung"
                      />
                    )}
                    <div className="flex gap-4">
                      <CheckCard
                        checked={data.elektrokennzeichen}
                        onChange={() => set('elektrokennzeichen', !data.elektrokennzeichen)}
                        label="Elektro-Kennzeichen"
                      />
                      <CheckCard
                        checked={data.saisonkennzeichen}
                        onChange={() => set('saisonkennzeichen', !data.saisonkennzeichen)}
                        label="Saison-Kennzeichen"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Benötigen Sie Kennzeichen?</h3>
                  <RadioCard
                    checked={data.kennzeichenLieferung === 'ja'}
                    onChange={() => set('kennzeichenLieferung', 'ja')}
                    label="Ja, bitte liefern Sie mir die Kennzeichen"
                  />
                  <RadioCard
                    checked={data.kennzeichenLieferung === 'nein'}
                    onChange={() => set('kennzeichenLieferung', 'nein')}
                    label="Nein, ich habe bereits welche / kaufe vor Ort"
                  />
                  {data.kennzeichenLieferung === 'nein' && (
                    <Input
                      label="Ihr Nummernschild"
                      value={data.nummernschild}
                      onChange={e => set('nummernschild', e.target.value.toUpperCase())}
                      placeholder="H XS 2332"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Umweltplakette</h3>
                  <RadioCard
                    checked={data.umweltplakette === 'ja'}
                    onChange={() => set('umweltplakette', 'ja')}
                    label="Ich möchte eine Feinstaubplakette per Lieferung erhalten"
                  />
                  <RadioCard
                    checked={data.umweltplakette === 'nein'}
                    onChange={() => set('umweltplakette', 'nein')}
                    label="Nein, ich benötige keine Feinstaubplakette"
                  />
                </div>
              </div>
            )}

            {/* ── Step 5: Versicherung ────────────────────────────────────── */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0a0a0a]">Versicherung</h3>

                <RadioCard
                  checked={data.versicherungOption === 'evb'}
                  onChange={() => set('versicherungOption', 'evb')}
                  label="Ich besitze eine gültige eVB-Nummer"
                />
                <RadioCard
                  checked={data.versicherungOption === 'vorhanden'}
                  onChange={() => set('versicherungOption', 'vorhanden')}
                  label="Ich habe eine Kfz-Versicherung, kenne meine eVB-Nummer aber nicht"
                  sublabel="Bitte kontaktieren Sie Ihre Versicherung um die eVB-Nummer zu erfragen"
                />
                <RadioCard
                  checked={data.versicherungOption === 'keine'}
                  onChange={() => set('versicherungOption', 'keine')}
                  label="Ich habe aktuell keine Kfz-Versicherung"
                  sublabel="Wir helfen Ihnen gerne bei der Vermittlung"
                />

                {data.versicherungOption === 'evb' && (
                  <Input
                    label="eVB-Nummer"
                    value={data.evbNummer}
                    onChange={e => set('evbNummer', e.target.value.toUpperCase())}
                    placeholder="eVB-Nummer (7-stellig)"
                    maxLength={7}
                  />
                )}
              </div>
            )}

            {/* ── Step 6: IBAN & Absenden ─────────────────────────────────── */}
            {step === 6 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#0a0a0a]">Bankverbindung</h3>
                  <p className="text-sm text-[#52525b]">
                    Die Zulassungsstelle benötigt Ihre IBAN um die Kfz-Steuer für das Fahrzeug abbuchen zu können.
                    Ohne IBAN ist keine Zulassung möglich.
                  </p>
                  <Input
                    label="Ihre IBAN *"
                    value={data.iban}
                    onChange={e => set('iban', e.target.value.replace(/\s/g, '').toUpperCase())}
                    placeholder="DE12 3456 7890 1234 5678 90"
                  />
                  <InfoBox>Ihre Daten werden verschlüsselt übertragen und ausschließlich für die Zulassung verwendet.</InfoBox>
                </div>

                {/* Zusammenfassung */}
                <div className="bg-[#f7f7f8] rounded-xl p-4 space-y-2 text-sm">
                  <div className="font-semibold text-[#0a0a0a] mb-3">Zusammenfassung</div>
                  {[
                    ['Halter', `${data.anrede} ${data.vorname} ${data.nachname}`],
                    ['Adresse', `${data.strasse}, ${data.plz} ${data.ort}`],
                    ['Kontakt', `${data.telefon} | ${data.email}`],
                    ['Fahrzeugtyp', data.fahrzeugtyp],
                    ['Vorgang', data.vorgang],
                    ['FIN', data.fin],
                    ['Kennzeichen', data.kennzeichenOption === 'zufaellig' ? 'Zufällig' : data.wunschkennzeichen || '-'],
                    ['Versicherung', data.versicherungOption === 'evb' ? `eVB: ${data.evbNummer}` : data.versicherungOption],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <span className="text-[#a1a1aa]">{k}</span>
                      <span className="text-[#0a0a0a] font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="flex gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#eee] text-sm font-medium text-[#52525b] hover:border-[#ddd] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep(s => s + 1)}
            disabled={!canProceed()}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              canProceed()
                ? 'bg-[#E31937] text-white hover:bg-[#C2102C]'
                : 'bg-[#eee] text-[#a1a1aa] cursor-not-allowed'
            }`}
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              canProceed() && !submitting
                ? 'bg-[#E31937] text-white hover:bg-[#C2102C]'
                : 'bg-[#eee] text-[#a1a1aa] cursor-not-allowed'
            }`}
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {submitting ? 'Wird gesendet...' : 'Antrag absenden'}
          </button>
        )}
      </div>
    </div>
  )
}
