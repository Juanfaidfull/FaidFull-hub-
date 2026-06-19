import type { Item } from './types'

const now = Date.now()
const day = 86_400_000

export const SEED_ITEMS: Item[] = [
  {
    id: 'seed-mc-pe',
    title: 'Minecraft PE — Mega Mod',
    description:
      'Versión modificada con todos los packs desbloqueados, shaders integrados y rendimiento optimizado para gama media.',
    category: 'juegos',
    tags: ['MOD', 'Optimizado', 'Android'],
    version: '1.21.0',
    size: '210 MB',
    cover: '',
    downloadUrl: 'https://www.mediafire.com/file/ejemplo/minecraft-mega-mod.apk',
    mirrors: [
      { id: 'm1', label: 'MediaFire', url: 'https://www.mediafire.com/file/ejemplo/minecraft-mega-mod.apk' },
      { id: 'm2', label: 'Mega', url: 'https://mega.nz/ejemplo' },
    ],
    featured: true,
    downloads: 18420,
    createdAt: now - day * 2,
  },
  {
    id: 'seed-gta',
    title: 'GTA San Andreas — Mod Pack',
    description:
      'Texturas HD, controles mejorados y misiones extra. Listo para instalar, sin verificación de licencia.',
    category: 'juegos',
    tags: ['MOD', 'HD', 'Sin licencia'],
    version: '2.11',
    size: '1.2 GB',
    cover: '',
    downloadUrl: 'https://www.mediafire.com/file/ejemplo/gta-sa-modpack.zip',
    mirrors: [
      { id: 'm1', label: 'MediaFire', url: 'https://www.mediafire.com/file/ejemplo/gta-sa-modpack.zip' },
    ],
    featured: false,
    downloads: 9310,
    createdAt: now - day * 5,
  },
  {
    id: 'seed-among',
    title: 'Among Us — Always Impostor',
    description:
      'APK modificada con menú flotante: siempre impostor, velocidad, no kill cooldown y skins desbloqueadas.',
    category: 'juegos',
    tags: ['MOD', 'Menú', 'Online'],
    version: '2024.6.5',
    size: '78 MB',
    cover: '',
    downloadUrl: 'https://www.mediafire.com/file/ejemplo/among-us-mod.apk',
    mirrors: [
      { id: 'm1', label: 'MediaFire', url: 'https://www.mediafire.com/file/ejemplo/among-us-mod.apk' },
    ],
    featured: false,
    downloads: 5421,
    createdAt: now - day * 9,
  },
  {
    id: 'seed-panel',
    title: 'JuanPanel — Launcher de APKs',
    description:
      'Proyecto open source: launcher ligero para organizar y abrir tus APKs modificadas con un toque.',
    category: 'proyectos',
    tags: ['App', 'Open Source', 'Kotlin'],
    version: '0.9.3',
    size: '14 MB',
    cover: '',
    downloadUrl: 'https://www.mediafire.com/file/ejemplo/juanpanel.apk',
    mirrors: [
      { id: 'm1', label: 'MediaFire', url: 'https://www.mediafire.com/file/ejemplo/juanpanel.apk' },
      { id: 'm2', label: 'GitHub', url: 'https://github.com/' },
    ],
    featured: true,
    downloads: 2890,
    createdAt: now - day * 1,
  },
  {
    id: 'seed-tweaks',
    title: 'Performance Tweaks Pack',
    description:
      'Scripts y configuraciones para mejorar FPS y reducir lag en juegos Android. Incluye guía de instalación.',
    category: 'proyectos',
    tags: ['Utilidad', 'Performance'],
    version: '3.0',
    size: '6 MB',
    cover: '',
    downloadUrl: 'https://www.mediafire.com/file/ejemplo/performance-tweaks.zip',
    mirrors: [
      { id: 'm1', label: 'MediaFire', url: 'https://www.mediafire.com/file/ejemplo/performance-tweaks.zip' },
    ],
    featured: false,
    downloads: 4102,
    createdAt: now - day * 14,
  },
]
