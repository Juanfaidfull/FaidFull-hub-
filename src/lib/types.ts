export type Category = 'juegos' | 'proyectos'

export interface Mirror {
  id: string
  label: string
  url: string
}

export interface Item {
  id: string
  title: string
  description: string
  category: Category
  tags: string[]
  version: string
  size: string
  cover: string
  downloadUrl: string
  mirrors: Mirror[]
  featured: boolean
  downloads: number
  createdAt: number
}

export type NewItem = Omit<Item, 'id' | 'createdAt' | 'downloads'>
