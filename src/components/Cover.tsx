import type { Category } from '../lib/types'
import { CodeIcon, GamepadIcon } from './Icons'

const PALETTES = [
  ['#ff1f30', '#7f0e19'],
  ['#ff5560', '#3a070d'],
  ['#e10f20', '#160e12'],
  ['#bd0a18', '#0a0608'],
  ['#ff9aa1', '#9a0c18'],
]

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

interface CoverProps {
  title: string
  category: Category
  src?: string
  className?: string
}

export default function Cover({ title, category, src, className = '' }: CoverProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  const [a, b] = PALETTES[hash(title) % PALETTES.length]
  const initials = title
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

  const Glyph = category === 'juegos' ? GamepadIcon : CodeIcon

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 120% at 20% 0%, ${a}, ${b})` }}
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="absolute -right-6 -bottom-6 text-white/10">
        <Glyph width={120} height={120} strokeWidth={1.2} />
      </div>
      <span className="relative font-display text-5xl font-extrabold text-white/90 text-glow">
        {initials || 'J'}
      </span>
    </div>
  )
}
