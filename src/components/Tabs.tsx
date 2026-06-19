import type { Category } from '../lib/types'
import { CodeIcon, GamepadIcon } from './Icons'

interface TabsProps {
  active: Category
  onChange: (c: Category) => void
  counts: { juegos: number; proyectos: number }
}

const TABS: { key: Category; label: string; icon: typeof GamepadIcon }[] = [
  { key: 'juegos', label: 'Juegos', icon: GamepadIcon },
  { key: 'proyectos', label: 'Proyectos', icon: CodeIcon },
]

export default function Tabs({ active, onChange, counts }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Categorías"
      className="relative grid grid-cols-2 gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 shadow-glow"
    >
      <span
        aria-hidden
        className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-[0_0_24px_-4px_rgba(255,31,48,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: active === 'proyectos' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {TABS.map(({ key, label, icon: Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
              isActive ? 'text-ink' : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.2} />
            {label}
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-extrabold ${
                isActive ? 'bg-ink/15 text-ink' : 'bg-white/10 text-zinc-400'
              }`}
            >
              {counts[key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
