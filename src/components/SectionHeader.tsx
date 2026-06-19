import type { Category } from '../lib/types'
import { FilterIcon, PlusIcon } from './Icons'

export type SortKey = 'recent' | 'downloads' | 'az' | 'featured'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Más recientes' },
  { key: 'downloads', label: 'Más descargados' },
  { key: 'featured', label: 'Destacados' },
  { key: 'az', label: 'A · Z' },
]

interface SectionHeaderProps {
  category: Category
  count: number
  sort: SortKey
  onSort: (s: SortKey) => void
  onAdd: () => void
}

export default function SectionHeader({
  category,
  count,
  sort,
  onSort,
  onAdd,
}: SectionHeaderProps) {
  const label = category === 'juegos' ? 'Juegos' : 'Proyectos'
  return (
    <div className="flex flex-col gap-4 border-b border-white/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-black/40 text-blood-400">
          <FilterIcon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-white">
            {label}
          </h2>
          <p className="text-xs text-zinc-500">
            {count} {count === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative">
          <span className="sr-only">Ordenar</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="cursor-pointer appearance-none rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-4 pr-9 text-sm font-medium text-zinc-200 transition-colors hover:border-blood-500/40 focus:border-blood-500/60 focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key} className="bg-ink-800 text-zinc-100">
                {s.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-blood-500 to-blood-700 px-4 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:from-blood-400 hover:to-blood-600 active:scale-[0.98]"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Añadir</span>
        </button>
      </div>
    </div>
  )
}
