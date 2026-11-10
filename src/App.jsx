import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { weddingConfig as c } from './data/weddingConfig'
import { music } from './utils/helpers'
import { Loader } from './components/Loader'
import { Opening } from './components/Opening'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Couple } from './components/Couple'
import { Story } from './components/Story'
import { Events } from './components/Events'
import { Countdown } from './components/Countdown'
import { Gallery } from './components/Gallery'
import { Venue } from './components/Venue'
import { Rsvp } from './components/Rsvp'
import { Closing } from './components/Closing'
import { MusicToggle } from './components/MusicToggle'
import { Cursor } from './components/Cursor'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    document.title = c.seo.title
    // Wait for the opening photograph (or 2.2s max) so the loader never hangs.
    const img = new Image()
    const done = () => setTimeout(() => setLoading(false), 900)
    img.onload = img.onerror = done
    img.src = c.opening.image
    const cap = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(cap)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', !opened)
    if (!opened) window.scrollTo(0, 0)
  }, [opened])

  const open = useCallback(async () => {
    setOpened(true) // user gesture → audio allowed
    setPlaying(await music.start())
  }, [])

  const toggleMusic = useCallback(async () => {
    if (music.playing) { music.stop(); setPlaying(false) }
    else setPlaying(await music.start())
  }, [])

  return (
    <>
      <Cursor />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <AnimatePresence>{!loading && !opened && <Opening key="opening" onOpen={open} />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero entered={opened} />
        <Couple />
        <Story />
        <Events />
        <Countdown />
        <Gallery />
        <Venue />
        <Rsvp />
        <Closing playing={playing} onToggleMusic={toggleMusic} />
      </main>
      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
    </>
  )
}
