import logo from '../assets/logo.png'

export default function Brand({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${className}`}>
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-black ring-1 ring-blood-500/40 shadow-glow transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-radial-blood opacity-70 animate-pulse-glow" />
        <img
          src={logo}
          alt="JuanProjects"
          className="relative h-9 w-9 object-contain sm:h-11 sm:w-11"
        />
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">
        Juan<span className="text-blood-500 text-glow">Projects</span>
      </span>
    </a>
  )
}
