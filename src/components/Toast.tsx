import { useEffect } from 'react'
import { CheckIcon } from './Icons'

interface ToastProps {
  message: string | null
  onDone: () => void
}

export default function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, 2600)
    return () => clearTimeout(t)
  }, [message, onDone])

  if (!message) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-blood-500/30 bg-ink-800/95 px-5 py-3 text-sm font-medium text-zinc-100 shadow-glow-lg backdrop-blur animate-fade-up">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-blood-600/20 text-blood-300">
          <CheckIcon className="h-4 w-4" />
        </span>
        {message}
      </div>
    </div>
  )
}
