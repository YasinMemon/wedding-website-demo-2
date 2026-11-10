import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { weddingConfig as c } from '../data/weddingConfig'
import { ImageReveal, Reveal, SectionHeading, SplitText } from './Reveal'

function Chapter({ ch, i }) {
  const right = i % 2 === 1
  return (
    <li className="relative grid gap-8 md:grid-cols-2 md:gap-24">
      {/* timeline node */}
      <span aria-hidden="true" className="absolute left-0 top-3 z-10 h-3 w-3 -translate-x-[calc(50%-0.5px)] rounded-full bg-peach ring-8 ring-beige md:left-1/2" />

      <div className={`pl-8 md:pl-0 ${right ? 'md:order-2' : ''}`}>
        <ImageReveal
          src={ch.image}
          alt={ch.imageAlt}
          direction={right ? 'right' : 'left'}
          className={`shadow-[var(--shadow-soft)] ${i % 3 === 0 ? 'aspect-[4/5]' : i % 3 === 1 ? 'aspect-[5/4]' : 'aspect-square'} ${
            right ? 'md:rounded-tl-[160px]' : 'md:rounded-tr-[160px]'
          }`}
        />
      </div>

      <div className={`pl-8 md:flex md:flex-col md:justify-center md:pl-0 ${right ? 'md:order-1 md:items-end md:text-right' : ''}`}>
        <Reveal>
          <p className="italic-serif text-[5.5rem] leading-none text-sage/80">0{i + 1}</p>
          <p className="eyebrow mt-2">{ch.date}</p>
        </Reveal>
        <h3 className="display mt-4 text-[clamp(2rem,3.8vw,3.2rem)]">
          <SplitText text={ch.title} />
        </h3>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-charcoal/75">{ch.text}</p>
        </Reveal>
      </div>
    </li>
  )
}

export function Story() {
  const s = c.story
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="story" className="relative bg-beige px-6 py-28 md:px-14 md:py-44">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading kicker={s.kicker} title={s.heading} className="mb-20 md:mb-32 md:text-center" align="center" />
        <div ref={ref} className="relative">
          {/* line */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-charcoal/10 md:left-1/2">
            <motion.div style={{ scaleY: reduce ? 1 : scaleY }} className="h-full origin-top bg-olive/60" />
          </div>
          <ol className="space-y-24 md:space-y-40">
            {s.chapters.map((ch, i) => (
              <Chapter key={ch.title} ch={ch} i={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
