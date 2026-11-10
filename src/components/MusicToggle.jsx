import { Volume2, VolumeX } from 'lucide-react'

export function MusicToggle({ playing, onToggle, className = '', inline = false }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      data-hot
      className={`${
        inline
          ? 'btn btn-light'
          : 'fixed bottom-4 left-4 z-40 flex h-11 w-11 md:bottom-5 md:left-5 md:h-12 md:w-12 items-center justify-center rounded-full border border-charcoal/20 bg-ivory/85 text-olive shadow-[var(--shadow-soft)] backdrop-blur transition hover:bg-olive hover:text-ivory'
      } ${className}`}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      {inline && <span>{playing ? 'Music on' : 'Music off'}</span>}
    </button>
  )
}
