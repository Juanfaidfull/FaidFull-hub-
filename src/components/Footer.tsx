import Socials from './Socials'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-14 border-t border-white/5 pt-8">
      <div className="flex flex-col items-center gap-5 pb-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="space-y-1">
          <p className="text-sm text-zinc-400">
            © {year}{' '}
            <span className="font-display font-bold text-white">
              Juan<span className="text-blood-500">Projects</span>
            </span>
            . Todos los derechos reservados.
          </p>
          <p className="text-sm text-zinc-500">
            DMCA:{' '}
            <a
              href="mailto:contacto@juanprojects.net"
              className="text-blood-400 underline-offset-2 transition-colors hover:text-blood-300 hover:underline"
            >
              contacto@juanprojects.net
            </a>
          </p>
        </div>
        <Socials />
      </div>
    </footer>
  )
}
