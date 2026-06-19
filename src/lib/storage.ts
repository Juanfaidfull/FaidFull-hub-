import type { Item, NewItem } from './types'
import { SEED_ITEMS } from './seed'

const STORAGE_KEY = 'juanprojects:items:v1'
const SEED_FLAG = 'juanprojects:seeded:v1'

export function uid(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase()
}

export function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      // First visit: seed with demo content once.
      if (localStorage.getItem(SEED_FLAG) === null) {
        localStorage.setItem(SEED_FLAG, '1')
        saveItems(SEED_ITEMS)
        return SEED_ITEMS
      }
      return []
    }
    const parsed = JSON.parse(raw) as Item[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveItems(items: Item[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
}

export function createItem(data: NewItem): Item {
  return {
    ...data,
    id: uid(),
    downloads: 0,
    createdAt: Date.now(),
  }
}
