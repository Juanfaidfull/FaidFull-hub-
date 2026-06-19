import type { ReactNode } from 'react'
import { ChatIcon, DiscordIcon, YoutubeIcon } from './Icons'

interface Social {
  label: string
  href: string
  icon: ReactNode
}

const SOCIALS: Social[] = [
  { label: 'Discord', href: 'https://discord.gg/', icon: <DiscordIcon className="h-5 w-5" /> },
  { label: 'YouTube', href: 'https://youtube.com/', icon: <YoutubeIcon className="h-5 w-5" /> },
  { label: 'Comunidad', href: 'https://t.me/', icon: <ChatIcon className="h-5 w-5" /> },
]

export default function Socials({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 shadow-glow ${className}`}
    >
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          title={s.label}
          className="grid h-10 w-10 place-items-center rounded-full text-zinc-300 transition-all duration-200 hover:bg-blood-600/20 hover:text-blood-300 hover:shadow-glow active:scale-95"
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
