import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { weddingConfig as c } from '../data/weddingConfig'
import { submitRsvp } from '../utils/helpers'
import { Reveal, SectionHeading } from './Reveal'
import { CalendarMenu } from './Events'

const initial = { attending: '', name: '', email: '', guests: '1', events: [], dietary: c.rsvp.dietary[0], message: '' }
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f) {
  const e = {}
  if (!f.attending) e.attending = 'Please let us know if you can join us.'
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!emailRx.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.attending === 'yes' && f.events.length === 0) e.events = 'Choose at least one event you will attend.'
  return e
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="err">{error}</p>}
    </div>
  )
}

export function Rsvp() {
  const r = c.rsvp
  const [f, setF] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (k, v) => {
    const next = { ...f, [k]: v }
    setF(next)
    if (touched[k] || touched._submit) setErrors(validate(next))
  }
  const blur = (k) => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(f)) }
  const toggleEvent = (id) => set('events', f.events.includes(id) ? f.events.filter((x) => x !== id) : [...f.events, id])

  const attending = f.attending === 'yes'
  const show = (k) => (touched[k] || touched._submit ? errors[k] : undefined)

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    setTouched((t) => ({ ...t, _submit: true }))
    if (Object.keys(errs).length) {
      document.querySelector('#rsvp-form [aria-invalid="true"], #rsvp-form [data-invalid="true"]')?.focus?.()
      return
    }
    setStatus('sending')
    try {
      await submitRsvp({
        ...f,
        name: f.name.trim(),
        email: f.email.trim(),
        events: attending ? f.events : [],
        guests: attending ? Number(f.guests) : 0,
        submittedAt: new Date().toISOString(),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => { setF(initial); setErrors({}); setTouched({}); setStatus('idle') }
  const chosen = c.events.filter((e) => f.events.includes(e.id))

  return (
    <section id="rsvp" className="relative bg-beige px-6 py-28 md:px-14 md:py-44">
      <div className="mx-auto grid max-w-[1300px] gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionHeading kicker={r.kicker} title={r.heading} />
          <Reveal delay={0.15}>
            <p className="italic-serif mt-8 text-2xl leading-snug text-olive">Kindly reply by {r.deadline}.</p>
            <p className="mt-4 text-charcoal/75">Your presence is the greatest gift. Tell us who is coming and which celebrations you will join, so we can plan every detail with care.</p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="relative bg-ivory p-7 shadow-[var(--shadow-soft)] md:p-14">
            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="py-6 text-center" role="status">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-olive text-olive"><Check size={26} strokeWidth={1.25} /></span>
                  <h3 className="display mt-8 text-4xl md:text-5xl">{attending ? 'Thank you, ' : 'We’ll miss you, '}{f.name.split(' ')[0]}.</h3>
                  <p className="italic-serif mt-4 text-2xl text-olive">{attending ? r.successMessage : 'Thank you for letting us know. You will be in our hearts on the day.'}</p>
                  {attending && (
                    <dl className="mx-auto mt-8 max-w-sm space-y-2 border-y border-charcoal/10 py-6 text-left text-[0.95rem]">
                      <div className="flex justify-between gap-4"><dt className="text-olive">Guests</dt><dd>{f.guests}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-olive">Events</dt><dd className="text-right">{chosen.map((e) => e.title).join(', ')}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-olive">Confirmation to</dt><dd>{f.email}</dd></div>
                    </dl>
                  )}
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {attending && chosen.length > 0 && <CalendarMenu events={chosen} label="Add my events to calendar" />}
                    <button onClick={reset} className="btn btn-line !px-5 !py-3">Submit another response</button>
                  </div>
                  {!r.endpoint && <p className="mt-8 text-xs uppercase tracking-[0.2em] text-charcoal/40">Demo mode — no data was sent</p>}
                </motion.div>
              ) : (
                <motion.form key="form" id="rsvp-form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-10">
                  <fieldset>
                    <legend className="label">Will you be attending?</legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-describedby={show('attending') ? 'attending-err' : undefined}>
                      {[['yes', 'Joyfully accepts'], ['no', 'Regretfully declines']].map(([v, label]) => (
                        <label key={v} data-hot className={`cursor-pointer border px-5 py-4 text-center transition-colors duration-300 ${f.attending === v ? 'border-olive bg-olive text-ivory' : 'border-charcoal/20 hover:border-olive'}`}>
                          <input type="radio" name="attending" value={v} checked={f.attending === v} onChange={() => set('attending', v)} className="sr-only" />
                          <span className="italic-serif text-xl">{label}</span>
                        </label>
                      ))}
                    </div>
                    {show('attending') && <p id="attending-err" role="alert" className="err">{errors.attending}</p>}
                  </fieldset>

                  <div className="grid gap-10 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={show('name')}>
                      <input id="name" className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} aria-invalid={!!show('name')} aria-describedby={show('name') ? 'name-err' : undefined} placeholder="As on your invitation" />
                    </Field>
                    <Field id="email" label="Email address" error={show('email')}>
                      <input id="email" type="email" inputMode="email" className="field" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!show('email')} aria-describedby={show('email') ? 'email-err' : undefined} placeholder="you@example.com" />
                    </Field>
                  </div>

                  <AnimatePresence initial={false}>
                    {attending && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="space-y-10 overflow-hidden">
                        <div className="grid gap-10 sm:grid-cols-2">
                          <Field id="guests" label="Number of guests">
                            <select id="guests" className="field" value={f.guests} onChange={(e) => set('guests', e.target.value)}>
                              {Array.from({ length: r.maxGuests }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                            </select>
                          </Field>
                          <Field id="dietary" label="Dietary preferences">
                            <select id="dietary" className="field" value={f.dietary} onChange={(e) => set('dietary', e.target.value)}>
                              {r.dietary.map((d) => <option key={d}>{d}</option>)}
                            </select>
                          </Field>
                        </div>

                        <fieldset>
                          <legend className="label">Which events will you attend?</legend>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-describedby={show('events') ? 'events-err' : undefined}>
                            {c.events.map((e) => {
                              const on = f.events.includes(e.id)
                              return (
                                <label key={e.id} data-hot className={`flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors duration-300 ${on ? 'border-olive bg-olive/10' : 'border-charcoal/15 hover:border-olive'}`}>
                                  <input type="checkbox" checked={on} onChange={() => toggleEvent(e.id)} className="peer sr-only" />
                                  <span aria-hidden="true" className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center border ${on ? 'border-olive bg-olive text-ivory' : 'border-charcoal/40'}`}>{on && <Check size={11} strokeWidth={3} />}</span>
                                  <span className="peer-focus-visible:underline">
                                    <span className="block leading-tight">{e.title}</span>
                                    <span className="text-xs text-charcoal/55">{new Date(e.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })} · {e.time}</span>
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                          {show('events') && <p id="events-err" role="alert" className="err">{errors.events}</p>}
                        </fieldset>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Field id="message" label="A personal message (optional)">
                    <textarea id="message" rows={3} className="field resize-none" value={f.message} onChange={(e) => set('message', e.target.value)} placeholder="Share a wish, a memory or a song request…" />
                  </Field>

                  {status === 'error' && <p role="alert" className="err">Something went wrong sending your response. Please try again.</p>}

                  <button type="submit" disabled={status === 'sending'} className="btn btn-dark w-full disabled:opacity-60">
                    {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending</> : 'Send Response'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
