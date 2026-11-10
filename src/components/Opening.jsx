import { motion } from 'framer-motion'
import { weddingConfig as c } from '../data/weddingConfig'

const fmtDate = new Date(c.weddingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })

export function Opening({ onOpen }) {
  const o = c.opening
  const line = (d) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: d, ease: [0.2, 0.7, 0.2, 1] },
  })
  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-hidden bg-charcoal text-ivory"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 1.5, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.img
        src={o.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'linear' }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/30" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p {...line(0.3)} className="eyebrow !text-ivory/85">{o.kicker}</motion.p>
        <motion.h1 {...line(0.55)} className="display mt-8 text-[clamp(3rem,11vw,9rem)] leading-[0.95]">
          Vihaan <span className="italic-serif text-peach">&amp;</span> Saanvi
        </motion.h1>
        <motion.p {...line(0.85)} className="italic-serif mt-8 text-[clamp(1.3rem,3vw,2rem)] text-ivory/90">{o.invite}</motion.p>
        <motion.p {...line(1.05)} className="eyebrow mt-8 !text-ivory">
          {fmtDate} <span className="mx-3 opacity-60">|</span> {c.location.short}
        </motion.p>

        <motion.button {...line(1.4)} onClick={onOpen} className="btn btn-light relative mt-14" data-hot>
          <span
            className="pointer-events-none absolute -inset-1.5 animate-[breathe_3.6s_ease-in-out_infinite] rounded-[2px] border border-ivory/40"
            aria-hidden="true"
          />
          <span className="relative">{o.button}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
