import { useState } from 'react'
import type { Item } from '../lib/types'
import { formatCount, hostLabel, timeAgo } from '../lib/format'
import Cover from './Cover'
import {
  DownloadIcon,
  EditIcon,
  ExternalIcon,
  StarIcon,
  TrashIcon,
} from './Icons'

interface ItemCardProps {
  item: Item
  index: number
  onDownload: (id: string) => void
  onEdit: (item: Item) => void
  onDelete: (item: Item) => void
}

export default function ItemCard({
  item,
  index,
  onDownload,
  onEdit,
  onDelete,
}: ItemCardProps) {
  const [confirm, setConfirm] = useState(false)

  const handleDownload = () => {
    onDownload(item.id)
    window.open(item.downloadUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <article
      className="panel panel-hover group relative flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 360)}ms` }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <Cover title={item.title} category={item.category} src={item.cover} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

        {item.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-blood-600/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-glow backdrop-blur">
            <StarIcon className="h-3 w-3" /> Destacado
          </span>
        )}

        {/* Admin actions */}
        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(item)}
            aria-label="Editar"
            title="Editar"
            className="grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-zinc-200 backdrop-blur transition-colors hover:bg-black/80 hover:text-white"
          >
            <EditIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setConfirm(true)}
            aria-label="Eliminar"
            title="Eliminar"
            className="grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-zinc-200 backdrop-blur transition-colors hover:bg-blood-600 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-[11px] font-medium text-zinc-300">
          <DownloadIcon className="h-3.5 w-3.5 text-blood-400" />
          {formatCount(item.downloads)}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-blood-500/20 bg-blood-600/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blood-300"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight text-white">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
          {item.version && <span>v{item.version}</span>}
          {item.version && item.size && <span className="text-zinc-700">•</span>}
          {item.size && <span>{item.size}</span>}
          <span className="text-zinc-700">•</span>
          <span>{timeAgo(item.createdAt)}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleDownload}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-blood-500 to-blood-700 px-4 py-2.5 text-sm font-bold text-white shadow-glow transition-all duration-200 hover:from-blood-400 hover:to-blood-600 active:scale-[0.98]"
          >
            <DownloadIcon className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
            Descargar · {hostLabel(item.downloadUrl)}
          </button>

          {item.mirrors.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.mirrors.map((m) => (
                <a
                  key={m.id}
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-blood-500/40 hover:text-white"
                >
                  <ExternalIcon className="h-3 w-3" />
                  {m.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm overlay */}
      {confirm && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink/90 p-6 text-center backdrop-blur-sm animate-scale-in">
          <p className="text-sm text-zinc-200">
            ¿Eliminar <span className="font-semibold text-white">{item.title}</span>?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirm(false)}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirm(false)
                onDelete(item)
              }}
              className="rounded-lg bg-blood-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blood-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
