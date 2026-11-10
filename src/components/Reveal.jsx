import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1]

/** Fade + slide reveal on scroll. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', once = true }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Image with a clip-path curtain reveal and slow inner scale settle. */
export function ImageReveal({ src, alt, className = '', imgClassName = '', direction = 'up', eager = false, children }) {
  const reduce = useReducedMotion()
  const from = { up: 'inset(100% 0 0 0)', left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)' }[direction]
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: from }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.3, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease }}
      />
      {children}
    </motion.div>
  )
}

/** Word-by-word masked headline reveal. */
export function SplitText({ text, className = '', delay = 0, immediate = false, as = 'span' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  const words = text.split(' ')
  const anim = immediate
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <M className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            {...anim}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.08 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  )
}

export function SectionHeading({ kicker, title, className = '', light = false, align = 'left' }) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <Reveal>
        <p className={`eyebrow ${light ? '!text-ivory/80' : ''}`}>{kicker}</p>
      </Reveal>
      <h2 className={`display mt-5 text-[clamp(2.4rem,6vw,5rem)] ${light ? 'text-ivory' : 'text-charcoal'}`}>
        <SplitText text={title} />
      </h2>
    </div>
  )
}
