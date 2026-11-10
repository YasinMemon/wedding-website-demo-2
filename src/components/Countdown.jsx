import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingConfig as c } from '../data/weddingConfig'
import { Reveal } from './Reveal'

const target = new Date(c.weddingDate).getTime()

const calc = () => {
  const diff = Math.max(0, target - Date.now())
  return {
    done: diff === 0,
    Days: Math.floor(diff / 864e5),
    Hours: Math.floor((diff / 36e5) % 24),
    Minutes: Math.floor((diff / 6e4) % 60),
    Seconds: Math.floor((diff / 1e3) % 60),
  }
}

function Unit({ label, value }) {
  const text = String(value).padStart(label === 'Days' ? 3 : 2, '0')
  return (
    <div className="flex flex-col items-center px-1.5 md:px-8">
      <div className="relative h-[1.05em] overflow-hidden text-[clamp(2.8rem,10vw,8rem)] leading-none" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="display block tabular-nums"
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow mt-4 !text-[0.6rem] !tracking-[0.18em] !text-ivory/70 md:!text-[0.72rem] md:!tracking-[0.32em]">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  const pl = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`
  const spoken = `${pl(t.Days, "day")}, ${pl(t.Hours, "hour")}, ${pl(t.Minutes, "minute")} until the ceremony`

  return (
    <section id="countdown" className="relative overflow-hidden bg-olive px-6 py-28 text-ivory md:py-40">
      {/* soft organic arcs */}
      <svg aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] opacity-[0.12]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4">
        {[90, 74, 58, 42, 26].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      </svg>
      <svg aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-[520px] w-[520px] opacity-[0.12]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4">
        {[90, 74, 58, 42, 26].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      </svg>

      <div className="relative mx-auto max-w-[1200px] text-center">
        <Reveal>
          <p className="eyebrow !text-ivory/75">Until we say “I do”</p>
          <p className="italic-serif mt-4 text-[clamp(1.5rem,3vw,2.2rem)] text-peach">22 November 2027 · 5:30 PM IST</p>
        </Reveal>

        {t.done ? (
          <p className="display mt-14 text-5xl md:text-7xl">Today, we celebrate.</p>
        ) : (
          <>
            <p className="sr-only" role="timer" aria-live="off">{spoken}</p>
            <Reveal delay={0.1} className="mt-14 flex items-start justify-center divide-x divide-ivory/20">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((k) => (
                <Unit key={k} label={k} value={t[k]} />
              ))}
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}
