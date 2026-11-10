import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { weddingConfig as c } from '../data/weddingConfig'
import { Reveal, SectionHeading } from './Reveal'

const ratioClass = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }

function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null)
  const [dir, setDir] = useState(1)
  const go = useCallback((d) => { setDir(d); onIndex((index + d + items.length) % items.length) }, [index, items.length, onIndex])

  useEffect(() => {
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    document.body.classList.add('locked')
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.classList.remove('locked')
      prevFocus?.focus?.()
    }
  }, [go, onClose])

  const it = items[index]
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[80] flex flex-col bg-charcoal/95 text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow !text-ivory/70">{it.category} <span className="mx-2">·</span> {index + 1} / {items.length}</p>
        <button ref={closeRef} onClick={onClose} aria-label="Close viewer" className="p-2 transition hover:text-peach"><X size={26} strokeWidth={1.25} /></button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.img
            key={it.src}
            src={it.src}
            alt={it.alt}
            custom={dir}
            variants={{
              enter: (d) => ({ opacity: 0, x: 60 * d }),
              center: { opacity: 1, x: 0 },
              exit: (d) => ({ opacity: 0, x: -60 * d }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
            onDragEnd={(_, i) => { if (i.offset.x < -80) go(1); else if (i.offset.x > 80) go(-1) }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full select-none object-contain shadow-2xl"
          />
        </AnimatePresence>
        <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 p-3 transition hover:text-peach md:left-8"><ChevronLeft size={36} strokeWidth={1} /></button>
        <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 transition hover:text-peach md:right-8"><ChevronRight size={36} strokeWidth={1} /></button>
      </div>
      <p className="italic-serif px-6 py-5 text-center text-lg text-ivory/80" onClick={(e) => e.stopPropagation()}>{it.alt}</p>
    </motion.div>
  )
}

export function Gallery() {
  const g = c.gallery
  const cats = useMemo(() => ['All', ...new Set(g.images.map((i) => i.category))], [g.images])
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = useMemo(() => (cat === 'All' ? g.images : g.images.filter((i) => i.category === cat)), [cat, g.images])
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="gallery" className="bg-ivory px-6 py-28 md:px-14 md:py-44">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading kicker={g.kicker} title={g.heading} />
          <Reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
              {cats.map((k) => (
                <button
                  key={k}
                  onClick={() => setCat(k)}
                  aria-pressed={cat === k}
                  className={`border px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] transition-colors duration-300 ${cat === k ? 'border-olive bg-olive text-ivory' : 'border-charcoal/20 hover:border-olive'}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-14 columns-1 gap-4 [column-fill:_balance] sm:columns-2 md:mt-20 lg:columns-3 xl:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((im, i) => (
              <motion.li
                layout
                key={im.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="mb-4 break-inside-avoid xl:mb-6"
              >
                <button onClick={() => setOpen(i)} data-hot className="group relative block w-full overflow-hidden" aria-label={`Open photo: ${im.alt}`}>
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${ratioClass[im.ratio]} w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]`}
                  />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/60 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-[0.62rem] uppercase tracking-[0.28em] text-ivory">{im.category}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}
      </AnimatePresence>
    </section>
  )
}
