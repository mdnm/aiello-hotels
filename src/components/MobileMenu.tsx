import { Menu, X } from "lucide-react"
import { useState, type PropsWithChildren } from "react"
import { getRouteWithLocale, type Locales } from "../utils/url"

export const MobileMenu = ({ baseUrl, locale, children }: PropsWithChildren<{ baseUrl: string, locale: Locales }>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button className="md:hidden" onClick={() => setIsMenuOpen(prev => !prev)}>
        {isMenuOpen ? <X className="w-8 h-8 text-primary" /> : <Menu className="w-8 h-8 text-primary" />}
      </button>
      {isMenuOpen && (
        <nav className="fixed top-[7.5rem] left-0 right-0 bottom-0 w-full px-2 py-4 bg-white flex flex-col gap-4">
          {children}
          <a href={getRouteWithLocale(baseUrl, locale, "/")} className="text-primary hover:brightness-200 transition duration-200">
            Home
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/san-babila")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Rooms – San Babila, Centro Storico
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/duomo")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Hotels – Duomo, Centro Storico
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/stazione-centrale")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Hotels – Centrale, Stazione Centrale
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/via-palmieri")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Suites Executive, Navigli
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/via-montegani")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Suites Milan, Navigli
          </a>
          <a href={getRouteWithLocale(baseUrl, locale, "/via-ausonio")} className="text-primary hover:brightness-200 transition duration-200">
            Aiello Rooms, Centro Città
          </a>
        </nav>
      )}
    </>
  )
}