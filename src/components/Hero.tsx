import { BoltIcon, DownloadIcon, PlusIcon, ShieldIcon } from './Icons'

interface HeroProps {
  stats: { juegos: number; proyectos: number; downloads: number }
  onAdd: () => void
  onExplore: () => void
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return String(n)
}

export default function Hero({ stats, onAdd, onExplore }: HeroProps) {
  return (
    <section className="relative panel overflow-hidden px-6 py-8 sm:px-10 sm:py-12 animate-fade-up">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blood-600/20 blur-3xl animate-float" />

      <div className="relative">
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-blood-400 sm:text-sm">
          Comunidad <span className="text-blood-600">·</span> Descargas{' '}
          <span className="text-blood-600">·</span> Servidores
        </p>

        <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Juegos y proyectos{' '}
          <span className="bg-gradient-to-br from-blood-300 via-blood-500 to-blood-700 bg-clip-text text-transparent text-glow">
            optimizados
          </span>
          , en un solo lugar.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Explora la biblioteca de JuanProjects, encuentra lo que buscas al
          instante y descarga desde múltiples fuentes.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-blood-500 to-blood-700 px-6 py-3 font-semibold text-white shadow-glow-lg transition-all duration-200 hover:from-blood-400 hover:to-blood-600 hover:shadow-glow-lg active:scale-[0.98]"
          >
            <DownloadIcon className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            Explorar biblioteca
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-semibold text-zinc-100 transition-all duration-200 hover:border-blood-500/50 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
          >
            <PlusIcon className="h-5 w-5" />
            Subir contenido
          </button>
        </div>

        <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
          <Stat icon={<BoltIcon className="h-4 w-4" />} value={String(stats.juegos)} label="Juegos" />
          <Stat icon={<ShieldIcon className="h-4 w-4" />} value={String(stats.proyectos)} label="Proyectos" />
          <Stat
            icon={<DownloadIcon className="h-4 w-4" />}
            value={formatCount(stats.downloads)}
            label="Descargas"
          />
        </dl>
      </div>
    </section>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
        <span className="text-blood-400">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-extrabold text-white">{value}</dd>
    </div>
  )
}
