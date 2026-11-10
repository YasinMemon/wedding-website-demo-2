import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/weddingConfig'

const behavior = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')

export function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.7)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', open)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.classList.remove('locked')
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: behavior() }), wasOpen ? 400 : 0)
  }

  const tone = solid || open ? 'text-charcoal' : 'text-ivory'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid && !open ? 'bg-ivory/90 py-3 shadow-[0_1px_0_rgba(41,41,35,.08)] backdrop-blur-md' : 'py-6'
        }`}
      >
        <nav className={`mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12 ${tone} transition-colors duration-500`} aria-label="Primary">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: behavior() })
              setOpen(false)
            }}
            className="italic-serif text-3xl leading-none"
            aria-label="Back to top"
          >
            V<span className="mx-1 text-peach">&amp;</span>S
          </a>
          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="ulink text-[0.7rem] uppercase tracking-[0.28em]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={26} strokeWidth={1.25} /> : <Menu size={26} strokeWidth={1.25} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ivory px-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          >
            <ul className="space-y-5">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="display block text-5xl text-charcoal">
                    <span className="italic-serif mr-4 text-xl text-olive">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="eyebrow mt-14">22 · 11 · 2027 — Goa</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
