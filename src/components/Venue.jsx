import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BedDouble, MapPin, Navigation, Plane, Sun, TrainFront } from 'lucide-react'
import { weddingConfig as c } from '../data/weddingConfig'
import { directionsUrl } from '../utils/helpers'
import { Reveal, SectionHeading, SplitText } from './Reveal'

const icons = { plane: Plane, train: TrainFront, bed: BedDouble, sun: Sun }

export function Venue() {
  const v = c.venue
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%'])

  return (
    <section id="venue" className="bg-ivory">
      {/* Cinematic venue image */}
      <div ref={ref} className="relative h-[80svh] min-h-[520px] overflow-hidden bg-charcoal">
        <motion.img src={v.image} alt={v.imageAlt} loading="lazy" decoding="async" style={{ y }} className="absolute inset-0 h-[120%] w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="relative flex h-full items-end px-6 pb-14 md:px-14 md:pb-20">
          <div className="mx-auto w-full max-w-[1300px] text-ivory">
            <SectionHeading kicker={v.kicker} title={v.name} light />
            <Reveal delay={0.2}>
              <p className="italic-serif mt-4 text-[clamp(1.3rem,2.6vw,2rem)] text-ivory/90">{v.heading}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-6 py-24 md:px-14 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal><p className="text-[1.08rem] leading-relaxed text-charcoal/80">{v.description}</p></Reveal>
            <Reveal delay={0.1}>
              <address className="mt-10 flex gap-4 border-t border-charcoal/15 pt-8 not-italic">
                <MapPin size={20} strokeWidth={1.3} className="mt-1 shrink-0 text-olive" />
                <span>
                  <strong className="display block text-2xl font-normal">{v.name}</strong>
                  <span className="mt-1 block text-charcoal/75">{v.address}</span>
                </span>
              </address>
              <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8">
                <Navigation size={15} strokeWidth={1.5} /> Get Directions
              </a>
            </Reveal>
          </div>

          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden bg-beige shadow-[var(--shadow-soft)] md:rounded-tr-[140px]">
                <iframe
                  title={`Map showing ${v.name}`}
                  src={v.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0 grayscale-[35%] sepia-[12%] transition duration-700 hover:grayscale-0 hover:sepia-0"
                />
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-5 -left-5 -z-10 hidden h-3/4 w-3/4 bg-sage/30 md:block" />
            </div>
          </Reveal>
        </div>

        <div className="mt-24 md:mt-36">
          <p className="eyebrow">Travel &amp; Accommodation</p>
          <h3 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)]"><SplitText text="Getting here, staying close" /></h3>
          <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {v.travel.map((t, i) => {
              const Icon = icons[t.icon]
              return (
                <Reveal as="li" key={t.title} delay={(i % 2) * 0.1} className="flex gap-5 border-t border-charcoal/15 pt-7">
                  <Icon size={26} strokeWidth={1.1} className="mt-1 shrink-0 text-olive" />
                  <div>
                    <h4 className="italic-serif text-2xl">{t.title}</h4>
                    <p className="mt-2 text-charcoal/75">{t.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
