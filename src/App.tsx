import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Category, Item, NewItem } from './lib/types'
import { createItem, loadItems, saveItems } from './lib/storage'
import Header from './components/Header'
import Hero from './components/Hero'
import Tabs from './components/Tabs'
import SectionHeader, { type SortKey } from './components/SectionHeader'
import ItemCard from './components/ItemCard'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import AddItemModal from './components/AddItemModal'
import Toast from './components/Toast'

function matchesSearch(item: Item, q: string): boolean {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    item.title.toLowerCase().includes(needle) ||
    item.description.toLowerCase().includes(needle) ||
    item.tags.some((t) => t.toLowerCase().includes(needle))
  )
}

function sortItems(items: Item[], sort: SortKey): Item[] {
  const copy = [...items]
  switch (sort) {
    case 'downloads':
      return copy.sort((a, b) => b.downloads - a.downloads)
    case 'az':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'es'))
    case 'featured':
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.createdAt - a.createdAt,
      )
    default:
      return copy.sort((a, b) => b.createdAt - a.createdAt)
  }
}

export default function App() {
  const [items, setItems] = useState<Item[]>(() => loadItems())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('juegos')
  const [sort, setSort] = useState<SortKey>('recent')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Item | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveItems(items)
  }, [items])

  const searched = useMemo(
    () => items.filter((it) => matchesSearch(it, search)),
    [items, search],
  )

  const counts = useMemo(
    () => ({
      juegos: searched.filter((i) => i.category === 'juegos').length,
      proyectos: searched.filter((i) => i.category === 'proyectos').length,
    }),
    [searched],
  )

  const heroStats = useMemo(
    () => ({
      juegos: items.filter((i) => i.category === 'juegos').length,
      proyectos: items.filter((i) => i.category === 'proyectos').length,
      downloads: items.reduce((sum, i) => sum + i.downloads, 0),
    }),
    [items],
  )

  const visible = useMemo(
    () => sortItems(searched.filter((i) => i.category === category), sort),
    [searched, category, sort],
  )

  const categoryLabel = category === 'juegos' ? 'Juegos' : 'Proyectos'
  const totalInCategory = items.filter((i) => i.category === category).length

  const openAdd = useCallback(() => {
    setEditing(null)
    setModalOpen(true)
  }, [])

  const openEdit = useCallback((item: Item) => {
    setEditing(item)
    setModalOpen(true)
  }, [])

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSave = useCallback(
    (data: NewItem, id?: string) => {
      if (id) {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, ...data } : it)),
        )
        setToast('Publicación actualizada')
      } else {
        const created = createItem(data)
        setItems((prev) => [created, ...prev])
        setCategory(data.category)
        setToast('¡Contenido publicado!')
      }
      setModalOpen(false)
      setEditing(null)
    },
    [],
  )

  const handleDelete = useCallback((item: Item) => {
    setItems((prev) => prev.filter((it) => it.id !== item.id))
    setToast('Publicación eliminada')
  }, [])

  const handleDownload = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, downloads: it.downloads + 1 } : it,
      ),
    )
  }, [])

  return (
    <div className="relative min-h-screen">
      <Header search={search} onSearch={setSearch} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
        <Hero stats={heroStats} onAdd={openAdd} onExplore={scrollToCatalog} />

        <div ref={catalogRef} className="mt-8 scroll-mt-24 sm:mt-10">
          <Tabs active={category} onChange={setCategory} counts={counts} />

          <section className="panel mt-5 overflow-hidden">
            <SectionHeader
              category={category}
              count={visible.length}
              sort={sort}
              onSort={setSort}
              onAdd={openAdd}
            />

            {visible.length === 0 ? (
              <EmptyState
                variant={
                  search && totalInCategory > 0 ? 'no-results' : 'empty'
                }
                categoryLabel={categoryLabel}
                onAdd={openAdd}
                onClear={() => setSearch('')}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                {visible.map((item, i) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    index={i}
                    onDownload={handleDownload}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>

      {modalOpen && (
        <AddItemModal
          key={editing?.id ?? 'new'}
          initial={editing}
          defaultCategory={category}
          onClose={() => {
            setModalOpen(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  )
}
