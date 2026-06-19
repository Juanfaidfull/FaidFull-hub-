import { useEffect, useState } from 'react'
import type { Category, Item, Mirror, NewItem } from '../lib/types'
import { uid } from '../lib/storage'
import { CloseIcon, CodeIcon, GamepadIcon, PlusIcon, TrashIcon } from './Icons'

interface AddItemModalProps {
  initial?: Item | null
  defaultCategory: Category
  onClose: () => void
  onSave: (data: NewItem, id?: string) => void
}

interface FormState {
  title: string
  description: string
  category: Category
  tags: string
  version: string
  size: string
  cover: string
  downloadUrl: string
  featured: boolean
  mirrors: Mirror[]
}

function initialForm(initial: Item | null | undefined, category: Category): FormState {
  if (initial) {
    return {
      title: initial.title,
      description: initial.description,
      category: initial.category,
      tags: initial.tags.join(', '),
      version: initial.version,
      size: initial.size,
      cover: initial.cover,
      downloadUrl: initial.downloadUrl,
      featured: initial.featured,
      mirrors: initial.mirrors,
    }
  }
  return {
    title: '',
    description: '',
    category,
    tags: '',
    version: '',
    size: '',
    cover: '',
    downloadUrl: '',
    featured: false,
    mirrors: [],
  }
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-blood-500/60 focus:outline-none focus:ring-1 focus:ring-blood-500/40'

const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-400'

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export default function AddItemModal({
  initial,
  defaultCategory,
  onClose,
  onSave,
}: AddItemModalProps) {
  const [form, setForm] = useState<FormState>(() =>
    initialForm(initial, defaultCategory),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const addMirror = () =>
    set('mirrors', [...form.mirrors, { id: uid(), label: '', url: '' }])

  const updateMirror = (id: string, patch: Partial<Mirror>) =>
    set(
      'mirrors',
      form.mirrors.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    )

  const removeMirror = (id: string) =>
    set('mirrors', form.mirrors.filter((m) => m.id !== id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.title.trim()) next.title = 'El título es obligatorio.'
    if (!form.downloadUrl.trim()) next.downloadUrl = 'Añade un enlace de descarga.'
    else if (!isValidUrl(form.downloadUrl.trim()))
      next.downloadUrl = 'El enlace no es válido (debe empezar por http).'
    const badMirror = form.mirrors.find(
      (m) => m.url.trim() && !isValidUrl(m.url.trim()),
    )
    if (badMirror) next.mirrors = 'Alguna fuente tiene un enlace inválido.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const data: NewItem = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 6),
      version: form.version.trim(),
      size: form.size.trim(),
      cover: form.cover.trim(),
      downloadUrl: form.downloadUrl.trim(),
      featured: form.featured,
      mirrors: form.mirrors
        .filter((m) => m.url.trim())
        .map((m) => ({
          id: m.id,
          label: m.label.trim() || 'Espejo',
          url: m.url.trim(),
        })),
    }
    onSave(data, initial?.id)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="panel relative my-0 w-full max-w-2xl animate-scale-in rounded-b-none rounded-t-3xl sm:my-8 sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-extrabold text-white">
              {initial ? 'Editar publicación' : 'Subir contenido'}
            </h2>
            <p className="text-xs text-zinc-500">
              Comparte un juego modificado o proyecto con enlace MediaFire.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5"
        >
          {/* Category toggle */}
          <div>
            <span className={labelClass}>Categoría</span>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { key: 'juegos' as const, label: 'Juego', Icon: GamepadIcon },
                  { key: 'proyectos' as const, label: 'Proyecto', Icon: CodeIcon },
                ]
              ).map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set('category', key)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    form.category === key
                      ? 'border-blood-500/60 bg-blood-600/15 text-white shadow-glow'
                      : 'border-white/10 bg-black/30 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="f-title">
              Título *
            </label>
            <input
              id="f-title"
              className={inputClass}
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Ej. Minecraft PE — Mega Mod"
            />
            {errors.title && <p className="mt-1 text-xs text-blood-400">{errors.title}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="f-desc">
              Descripción
            </label>
            <textarea
              id="f-desc"
              rows={3}
              className={`${inputClass} resize-none`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe el mod, qué incluye y cómo instalarlo."
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="f-url">
              Enlace de descarga (MediaFire) *
            </label>
            <input
              id="f-url"
              className={inputClass}
              value={form.downloadUrl}
              onChange={(e) => set('downloadUrl', e.target.value)}
              placeholder="https://www.mediafire.com/file/…"
            />
            {errors.downloadUrl && (
              <p className="mt-1 text-xs text-blood-400">{errors.downloadUrl}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="f-version">
                Versión
              </label>
              <input
                id="f-version"
                className={inputClass}
                value={form.version}
                onChange={(e) => set('version', e.target.value)}
                placeholder="1.21.0"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-size">
                Tamaño
              </label>
              <input
                id="f-size"
                className={inputClass}
                value={form.size}
                onChange={(e) => set('size', e.target.value)}
                placeholder="210 MB"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="f-tags">
              Etiquetas <span className="text-zinc-600">(separadas por comas)</span>
            </label>
            <input
              id="f-tags"
              className={inputClass}
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="MOD, Optimizado, Android"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="f-cover">
              Portada <span className="text-zinc-600">(URL de imagen, opcional)</span>
            </label>
            <input
              id="f-cover"
              className={inputClass}
              value={form.cover}
              onChange={(e) => set('cover', e.target.value)}
              placeholder="https://…/portada.jpg"
            />
          </div>

          {/* Mirrors */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className={`${labelClass} mb-0`}>Fuentes adicionales</span>
              <button
                type="button"
                onClick={addMirror}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition-colors hover:border-blood-500/40 hover:text-white"
              >
                <PlusIcon className="h-3.5 w-3.5" /> Añadir fuente
              </button>
            </div>
            <div className="space-y-2">
              {form.mirrors.map((m) => (
                <div key={m.id} className="flex gap-2">
                  <input
                    className={`${inputClass} max-w-[7rem]`}
                    value={m.label}
                    onChange={(e) => updateMirror(m.id, { label: e.target.value })}
                    placeholder="Mega"
                  />
                  <input
                    className={inputClass}
                    value={m.url}
                    onChange={(e) => updateMirror(m.id, { url: e.target.value })}
                    placeholder="https://…"
                  />
                  <button
                    type="button"
                    onClick={() => removeMirror(m.id)}
                    aria-label="Quitar fuente"
                    className="grid w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-blood-500/40 hover:text-blood-400"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.mirrors && <p className="mt-1 text-xs text-blood-400">{errors.mirrors}</p>}
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="h-4 w-4 accent-blood-500"
            />
            <span className="text-sm font-medium text-zinc-200">
              Marcar como destacado
            </span>
          </label>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/5 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-blood-500 to-blood-700 px-6 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:from-blood-400 hover:to-blood-600 active:scale-[0.98]"
          >
            {initial ? 'Guardar cambios' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  )
}
