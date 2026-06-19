export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return String(n)
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const min = Math.floor(diff / 60_000)
  const hr = Math.floor(diff / 3_600_000)
  const day = Math.floor(diff / 86_400_000)
  if (day >= 30) return `hace ${Math.floor(day / 30)} mes${Math.floor(day / 30) > 1 ? 'es' : ''}`
  if (day >= 1) return `hace ${day} día${day > 1 ? 's' : ''}`
  if (hr >= 1) return `hace ${hr} h`
  if (min >= 1) return `hace ${min} min`
  return 'recién'
}

export function hostLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host.includes('mediafire')) return 'MediaFire'
    if (host.includes('mega')) return 'Mega'
    if (host.includes('drive.google')) return 'Drive'
    if (host.includes('github')) return 'GitHub'
    if (host.includes('mega.nz')) return 'Mega'
    return host.split('.')[0].replace(/^\w/, (c) => c.toUpperCase())
  } catch {
    return 'Enlace'
  }
}

export function isMediaFire(url: string): boolean {
  return /mediafire\.com/i.test(url)
}
