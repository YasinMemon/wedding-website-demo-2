import { weddingConfig as c } from '../data/weddingConfig'
import { ImageReveal, Reveal, SectionHeading, SplitText } from './Reveal'

function Profile({ p, flip, offset }) {
  return (
    <article className={`grid items-center gap-10 md:grid-cols-12 md:gap-6 ${offset}`}>
      <div className={`md:col-span-6 ${flip ? 'md:order-2 md:col-start-7' : 'md:col-start-1'}`}>
        <div className="relative">
          <ImageReveal
            src={p.image}
            alt={p.imageAlt}
            direction={flip ? 'right' : 'left'}
            className={`aspect-[4/5] shadow-[var(--shadow-soft)] ${flip ? 'rounded-t-[999px]' : 'rounded-b-[999px]'}`}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -z-10 hidden h-full w-full border border-sage md:block ${
              flip ? '-bottom-6 -left-6 rounded-t-[999px]' : '-right-6 -top-6 rounded-b-[999px]'
            }`}
          />
        </div>
      </div>

      <div className={`md:col-span-5 ${flip ? 'md:order-1 md:col-start-1 md:pr-6' : 'md:col-start-8 md:pl-2'}`}>
        <Reveal><p className="eyebrow">{p.role}</p></Reveal>
        <h3 className="display mt-4 text-[clamp(2.6rem,5.5vw,4.8rem)]">
          <SplitText text={p.fullName} />
        </h3>
        <Reveal delay={0.15} className="mt-8 space-y-5 text-[1.05rem] text-charcoal/80">
          {p.intro.map((t, i) => (
            <p key={i} className={i === 0 ? 'italic-serif text-[1.55rem] leading-snug text-olive' : ''}>{t}</p>
          ))}
        </Reveal>
        <Reveal delay={0.25}>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal/15 pt-6">
            {p.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.62rem] uppercase tracking-[0.25em] text-olive">{k}</dt>
                <dd className="italic-serif mt-1 text-lg leading-tight">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </article>
  )
}

export function Couple() {
  const { groom, bride, heading } = c.couple
  return (
    <section id="couple" className="relative bg-ivory px-6 py-28 md:px-14 md:py-44">
      <div className="mx-auto max-w-[1300px]">
        <SectionHeading kicker="The Couple" title={heading} className="mb-20 md:mb-32 md:max-w-3xl" />
        <div className="space-y-28 md:space-y-48">
          <Profile p={groom} />
          <Profile p={bride} flip offset="md:-mt-4" />
        </div>
      </div>
    </section>
  )
}
