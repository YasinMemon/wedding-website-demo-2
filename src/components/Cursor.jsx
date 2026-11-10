import { useEffect, useRef } from 'react'

/** Desktop-only soft cursor ring. Skipped for touch devices and reduced-motion. */
export function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    const ok = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!ok) return
    document.body.classList.add('has-cursor')
    const el = ref.current
    let x = -100, y = -100, cx = x, cy = y, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.classList.toggle('hot', !!e.target.closest?.('a,button,[data-hot],input,select,textarea,label'))
    }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-cursor')
    }
  }, [])
  return <div ref={ref} className="cursor" aria-hidden="true" />
}
