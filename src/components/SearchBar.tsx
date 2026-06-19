import { CloseIcon, SearchIcon } from './Icons'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  className?: string
}

export default function SearchBar({ value, onChange, className = '' }: SearchBarProps) {
  return (
    <div className={`group relative ${className}`}>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-radial-blood opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-60" />
      <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3.5 shadow-glow transition-all duration-300 focus-within:border-blood-500/60 focus-within:shadow-glow-lg">
        <SearchIcon className="h-5 w-5 shrink-0 text-zinc-400 transition-colors group-focus-within:text-blood-400" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="search"
          placeholder="Buscar APKs, juegos, proyectos…"
          aria-label="Buscar"
          className="w-full bg-transparent text-[15px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Limpiar búsqueda"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
