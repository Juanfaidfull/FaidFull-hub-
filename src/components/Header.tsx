import Brand from './Brand'
import SearchBar from './SearchBar'
import Socials from './Socials'

interface HeaderProps {
  search: string
  onSearch: (v: string) => void
}

export default function Header({ search, onSearch }: HeaderProps) {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-xl"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-3.5 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <SearchBar
            value={search}
            onChange={onSearch}
            className="order-2 md:order-2 md:flex-1 md:max-w-xl"
          />
          <div className="order-1 flex items-center justify-between gap-3 md:contents">
            <Brand className="md:order-1 md:mr-2" />
            <Socials className="md:order-3" />
          </div>
        </div>
      </div>
    </header>
  )
}
