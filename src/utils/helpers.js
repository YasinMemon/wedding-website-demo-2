import { weddingConfig as c } from '../data/weddingConfig'

/* ---------- Calendar ---------- */
const fmt = (d) => new Date(d).toISOString().replace(/[-:]|\.\d+/g, '')
const title = (e) => `${e.title} — Vihaan & Saanvi`
const desc = (e) => `${e.tagline}. Dress code: ${e.dressCode}.`

export const googleCalendarUrl = (e) =>
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: title(e),
    dates: `${fmt(e.start)}/${fmt(e.end)}`,
    details: desc(e),
    location: `${e.venue}, ${c.venue.name}, ${c.venue.address}`,
  })

export function downloadIcs(events, filename = 'vihaan-saanvi-wedding.ics') {
  const list = Array.isArray(events) ? events : [events]
  const body = list.flatMap((e) => [
    'BEGIN:VEVENT',
    `UID:${e.id}@vihaan-saanvi.wedding`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(e.start)}`,
    `DTEND:${fmt(e.end)}`,
    `SUMMARY:${title(e)}`,
    `DESCRIPTION:${desc(e)}`,
    `LOCATION:${e.venue}\\, ${c.venue.name}\\, ${c.venue.address.replace(/,/g, '\\,')}`,
    'END:VEVENT',
  ])
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Vihaan & Saanvi//EN', 'CALSCALE:GREGORIAN', ...body, 'END:VCALENDAR'].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/* ---------- Maps & sharing ---------- */
export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.venue.mapsQuery)}`

export const whatsappUrl = () =>
  `https://wa.me/?text=${encodeURIComponent(c.whatsapp.message + (typeof window !== 'undefined' ? window.location.href.split('#')[0] : c.siteUrl))}`

/* ---------- RSVP submission handler (swap this out for a real backend) ---------- */
export async function submitRsvp(payload) {
  if (c.rsvp.endpoint) {
    const res = await fetch(c.rsvp.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Submission failed')
    return res.json().catch(() => ({}))
  }
  // Demo mode: simulate network latency, nothing leaves the browser.
  await new Promise((r) => setTimeout(r, 1200))
  return { ok: true, demo: true }
}

/* ---------- Background music (file or generative ambient score) ---------- */
let ctx, master, nodes = [], el

function buildAmbient() {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return false
  ctx = ctx || new AC()
  master = ctx.createGain()
  master.gain.value = 0
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900
  master.connect(filter).connect(ctx.destination)
  // Warm, slow-breathing chord: Dmaj9-ish
  ;[146.83, 220, 293.66, 369.99, 440, 554.37].forEach((f, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    o.type = i % 2 ? 'sine' : 'triangle'
    o.frequency.value = f
    o.detune.value = (i - 3) * 4
    g.gain.value = 0.05 / (1 + i * 0.35)
    lfo.frequency.value = 0.06 + i * 0.023
    lfoGain.gain.value = g.gain.value * 0.6
    lfo.connect(lfoGain).connect(g.gain)
    o.connect(g).connect(master)
    o.start()
    lfo.start()
    nodes.push(o, lfo)
  })
  return true
}

export const music = {
  playing: false,
  async start() {
    const { src, volume } = c.music
    try {
      if (src) {
        el = el || Object.assign(new Audio(src), { loop: true, volume: 0 })
        await el.play()
        fade((v) => (el.volume = v), 0, volume)
      } else {
        if (!master && !buildAmbient()) return false
        await ctx.resume()
        master.gain.cancelScheduledValues(ctx.currentTime)
        master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3)
      }
      this.playing = true
      return true
    } catch {
      return false // autoplay blocked — the toggle lets the guest start manually
    }
  },
  stop() {
    this.playing = false
    if (c.music.src && el) {
      fade((v) => (el.volume = v), el.volume, 0, () => el.pause())
    } else if (master) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
    }
  },
}

function fade(set, from, to, done) {
  const t0 = performance.now(), dur = 1500
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur)
    set(Math.max(0, Math.min(1, from + (to - from) * p)))
    p < 1 ? requestAnimationFrame(step) : done?.()
  }
  requestAnimationFrame(step)
}
