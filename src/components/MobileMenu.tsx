import { Menu, X } from "lucide-react";
import { useState, type PropsWithChildren } from "react";
import * as m from '../paraglide/messages';

export const MobileMenu = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button className="md:hidden" onClick={() => setIsMenuOpen(prev => !prev)}>
        {isMenuOpen ? <X className="w-8 h-8 text-primary" /> : <Menu className="w-8 h-8 text-primary" />}
      </button>
      {isMenuOpen && (
        <nav className="fixed top-[7.5rem] left-0 right-0 bottom-0 w-full px-2 py-4 bg-white flex flex-col gap-4">
          {children}
          <a href="/" className="text-primary hover:brightness-200 transition duration-200">
            {m.home()}
          </a>
          <a href="/san-babila" className="text-primary hover:brightness-200 transition duration-200">
            {m.sanBabilaDescription()}
          </a>
          <a href="/duomo" className="text-primary hover:brightness-200 transition duration-200">
            {m.duomoDescription()}
          </a>
          <a href="/stazione-centrale" className="text-primary hover:brightness-200 transition duration-200">
            {m.stazioneCentraleDescription()}
          </a>
          <a href="/via-palmieri" className="text-primary hover:brightness-200 transition duration-200">
            {m.viaPalmieriDescription()}
          </a>
          <a href="/via-montegani" className="text-primary hover:brightness-200 transition duration-200">
            {m.viaMonteganiDescription()}
          </a>
          <a href="/via-ausonio" className="text-primary hover:brightness-200 transition duration-200">
            {m.viaAusonioDescription()}
          </a>
        </nav>
      )}
    </>
  )
}