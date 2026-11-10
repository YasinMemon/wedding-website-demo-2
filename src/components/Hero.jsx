import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { weddingConfig as c } from '../data/weddingConfig'
import { SplitText } from './Reveal'

export function Hero({ entered }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const fadeIn = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: entered ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay: d, ease: [0.2, 0.7, 0.2, 1] },
  })

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal text-ivory">
      <motion.img
        src={c.hero.image}
        alt={c.hero.imageAlt}
        style={{ y }}
        className="absolute inset-0 h-[118%] w-full -translate-y-[0%] object-cover object-[50%_30%]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/5 to-charcoal/40" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-28 md:px-14 md:pb-24">
        <div className="mx-auto w-full max-w-[1500px]">
          <motion.p {...fadeIn(0.2)} className="eyebrow !text-ivory/85">{c.weddingTitle}</motion.p>
          <h1 className="display mt-6 text-[clamp(3.6rem,14vw,11.5rem)] leading-[0.84]">
            {entered ? <SplitText text="Vihaan" immediate delay={0.25} /> : <span className="invisible">Vihaan</span>}
            <span className="italic-serif ml-[0.1em] inline-block text-[0.45em] text-peach align-middle md:ml-[0.3em]">
              <motion.span {...fadeIn(0.9)} className="inline-block">&amp;</motion.span>
            </span>
            <br />
            <span className="block md:ml-[14vw]">
              {entered ? <SplitText text="Saanvi" immediate delay={0.55} /> : <span className="invisible">Saanvi</span>}
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-5 md:mt-14 md:flex-row md:items-end md:justify-between">
            <motion.p {...fadeIn(1.2)} className="italic-serif max-w-md text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">
              {c.hero.tagline}
            </motion.p>
            <motion.p {...fadeIn(1.4)} className="eyebrow !text-ivory">
              22 November 2027 <span className="mx-3 opacity-60">—</span> {c.location.short}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#couple"
        {...fadeIn(1.8)}
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('couple')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
        }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 md:flex"
        aria-label="Scroll to the couple"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-0 animate-[drip_2.4s_ease-in-out_infinite] bg-ivory" />
        </span>
      </motion.a>
    </section>
  )
}
