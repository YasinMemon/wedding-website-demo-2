import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { weddingConfig as c } from '../data/weddingConfig'
import { whatsappUrl } from '../utils/helpers'
import { Reveal, SplitText } from './Reveal'
import { MusicToggle } from './MusicToggle'

export function Closing({ playing, onToggleMusic }) {
  const k = c.closing
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '0%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-32 text-center">
        <motion.img src={k.image} alt={k.imageAlt} loading="lazy" decoding="async" style={{ y }} className="absolute inset-0 h-[112%] w-full object-cover object-[50%_35%]" />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/30" />

        <div className="relative z-10 max-w-4xl">
          <h2 className="italic-serif text-[clamp(2.8rem,8vw,7rem)] leading-[1.02]">
            <SplitText text={k.headline} />
          </h2>
          <Reveal delay={0.3}>
            <p className="display mt-10 text-[clamp(1.4rem,3vw,2.2rem)]">{k.signoff}</p>
            <p className="eyebrow mt-5 !text-ivory/80">22 November 2027</p>
          </Reveal>
          <Reveal delay={0.45} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <MessageCircle size={15} strokeWidth={1.5} /> Share on WhatsApp
            </a>
            <MusicToggle inline playing={playing} onToggle={onToggleMusic} />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
              className="btn btn-light"
            >
              <ArrowUp size={15} strokeWidth={1.5} /> Back to top
            </button>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-ivory/10 bg-charcoal px-6 py-10 text-center md:px-14">
        <p className="italic-serif text-3xl text-peach">V &amp; S</p>
        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-ivory/60">{c.weddingTitle} · {c.venue.name} · {c.location.short}</p>
        <p className="mt-6 text-xs text-ivory/40">A bespoke digital wedding experience — Demo 02</p>
      </footer>
    </section>
  )
}
