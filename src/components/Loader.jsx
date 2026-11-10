import { motion } from 'framer-motion'
import { weddingConfig as c } from '../data/weddingConfig'

export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      role="status"
      aria-label="Loading invitation"
    >
      <motion.p
        className="italic-serif text-5xl text-olive"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {c.couple.groom.firstName[0]} &amp; {c.couple.bride.firstName[0]}
      </motion.p>
      <div className="mt-8 h-px w-40 overflow-hidden bg-olive/20">
        <motion.div className="h-full bg-olive" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      </div>
    </motion.div>
  )
}
