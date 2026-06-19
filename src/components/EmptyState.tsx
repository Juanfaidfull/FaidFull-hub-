import { BoxIcon, PlusIcon, SearchIcon } from './Icons'

interface EmptyStateProps {
  variant: 'empty' | 'no-results'
  categoryLabel: string
  onAdd: () => void
  onClear?: () => void
}

export default function EmptyState({
  variant,
  categoryLabel,
  onAdd,
  onClear,
}: EmptyStateProps) {
  const isSearch = variant === 'no-results'
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20 animate-fade-up">
      <div className="relative mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-white/5 bg-black/40">
        <span className="absolute inset-0 rounded-3xl bg-radial-blood opacity-50 animate-pulse-glow" />
        {isSearch ? (
          <SearchIcon className="relative h-9 w-9 text-zinc-500" />
        ) : (
          <BoxIcon className="relative h-9 w-9 text-zinc-500" />
        )}
      </div>
      <p className="max-w-sm text-base text-zinc-400">
        {isSearch ? (
          <>No encontramos resultados para tu búsqueda en {categoryLabel}.</>
        ) : (
          <>
            Aún no hay nada en {categoryLabel}. Pronto se añadirá contenido
            aquí.
          </>
        )}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isSearch && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-blood-500/50 hover:text-white"
          >
            Limpiar filtros
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-blood-500 to-blood-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:from-blood-400 hover:to-blood-600 active:scale-[0.98]"
          >
            <PlusIcon className="h-4 w-4" />
            Subir el primero
          </button>
        )}
      </div>
    </div>
  )
}
