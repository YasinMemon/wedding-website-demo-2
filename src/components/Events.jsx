import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, Clock, MapPin, Shirt } from 'lucide-react'
import { weddingConfig as c } from '../data/weddingConfig'
import { downloadIcs, googleCalendarUrl } from '../utils/helpers'
import { ImageReveal, Reveal, SectionHeading, SplitText } from './Reveal'

const longDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })

/** "Add to Calendar" popover: Google Calendar link or .ics download */
export function CalendarMenu({ events, label = 'Add to Calendar', dark = false, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const list = Array.isArray(events) ? events : [events]
  useEffect(() => {
    if (!open) return
    const off = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', off)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc) }
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className={`btn ${dark ? 'btn-light' : 'btn-line'} !px-5 !py-3`}>
        <CalendarPlus size={15} strokeWidth={1.5} /> {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`absolute z-30 mt-2 min-w-[220px] border border-charcoal/10 bg-ivory text-charcoal shadow-[var(--shadow-soft)] ${align === 'right' ? 'right-0' : 'left-0'}`}
          >
            {list.length === 1 && (
              <a role="menuitem" href={googleCalendarUrl(list[0])} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block px-5 py-3 text-sm hover:bg-beige">
                Google Calendar
              </a>
            )}
            <button
              role="menuitem"
              onClick={() => { downloadIcs(list, list.length === 1 ? `${list[0].id}.ics` : undefined); setOpen(false) }}
              className="block w-full px-5 py-3 text-left text-sm hover:bg-beige"
            >
              Apple / Outlook (.ics)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Meta({ icon: Icon, children }) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={16} strokeWidth={1.4} className="mt-1 shrink-0 opacity-70" />
      <span>{children}</span>
    </li>
  )
}

/** Each event gets its own editorial composition. */
function EventRow({ e, i }) {
  const n = String(i + 1).padStart(2, '0')
  const dark = e.id === 'sangeet' || e.id === 'reception'
  const feature = e.id === 'ceremony'
  const imageRight = i % 2 === 1

  const bg = feature ? 'bg-peach/35' : e.id === 'sangeet' ? 'bg-olive text-ivory' : e.id === 'reception' ? 'bg-charcoal text-ivory' : i === 0 ? 'bg-ivory' : 'bg-beige'
  const imgShape = [
    'aspect-[4/5] md:rounded-t-[999px]',
    'aspect-[5/4] md:rounded-bl-[200px]',
    'aspect-[3/4]',
    'aspect-[4/5] md:aspect-[4/5]',
    'aspect-[5/4] md:rounded-tr-[200px]',
  ][i]

  return (
    <article className={`${bg} px-6 py-20 md:px-14 md:py-32`}>
      <div className={`mx-auto grid max-w-[1300px] items-center gap-12 md:gap-16 ${feature ? 'md:grid-cols-[1.15fr_1fr]' : 'md:grid-cols-2'}`}>
        <div className={imageRight ? 'md:order-2' : ''}>
          <ImageReveal src={e.image} alt={e.imageAlt} direction={imageRight ? 'right' : 'left'} className={`${imgShape} shadow-[var(--shadow-soft)]`}>
            <span className="absolute left-5 top-5 bg-ivory/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.3em] text-charcoal">{e.venue}</span>
          </ImageReveal>
        </div>

        <div className={imageRight ? 'md:order-1' : ''}>
          <Reveal>
            <p className="flex items-center gap-4">
              <span className="italic-serif text-7xl leading-none md:text-8xl" style={{ color: dark ? e.id === 'sangeet' ? '#D9B6A5' : '#A5AA91' : e.accent }}>{n}</span>
              <span className={`eyebrow ${dark ? '!text-ivory/75' : ''}`}>{feature ? 'The Main Event' : 'Event'}</span>
            </p>
          </Reveal>
          <h3 className="display mt-6 text-[clamp(2.2rem,4.6vw,4rem)]">
            <SplitText text={e.title} />
          </h3>
          <Reveal delay={0.1}>
            <p className="italic-serif mt-4 text-2xl opacity-85">{e.tagline}</p>
            <ul className={`mt-8 space-y-3 border-t pt-6 text-[1.02rem] ${dark ? 'border-ivory/20' : 'border-charcoal/15'}`}>
              <Meta icon={Clock}>{longDate(e.start)} · {e.time}</Meta>
              <Meta icon={Shirt}>Dress code: <strong className="font-normal italic-serif text-xl">{e.dressCode}</strong></Meta>
              <Meta icon={MapPin}>{e.venue}, {c.venue.name}</Meta>
            </ul>
            <div className="mt-8"><CalendarMenu events={e} dark={dark} /></div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

export function Events() {
  return (
    <section id="events">
      <div className="bg-ivory px-6 pt-28 md:px-14 md:pt-44">
        <div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading kicker="The Celebrations" title="Three days by the sea" className="md:max-w-4xl" />
          <Reveal className="md:pb-3">
            <CalendarMenu events={c.events} label="Add all to calendar" align="left" />
          </Reveal>
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        {c.events.map((e, i) => (
          <EventRow key={e.id} e={e} i={i} />
        ))}
      </div>
    </section>
  )
}
