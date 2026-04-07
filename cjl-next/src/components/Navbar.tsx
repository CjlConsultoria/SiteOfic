"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/planos", label: "Planos" },
  { href: "/sistemas", label: "Sistemas" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/images/logocjl.png" alt="CJL Consultoria" width={80} height={80} className="w-20 h-20 object-contain" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`relative text-sm font-medium tracking-wide transition-colors duration-200 pb-1 ${isActive ? "text-[#d4a017]" : "text-white hover:text-[#d4a017]"}`}>
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a017] rounded-full" />}
                </Link>
              );
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/plataforma" className="text-sm font-semibold px-5 py-2 rounded-full bg-[#d4a017] text-black hover:bg-[#b8860b] transition-all">
                  Plataforma
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link href="/registre" className="text-sm font-semibold px-5 py-2 rounded-full border border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017] hover:text-black transition-all">Cadastre-se</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white hover:text-[#d4a017] focus:outline-none transition-colors duration-200" aria-label="Toggle menu">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-gray-800 bg-black px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`block text-sm font-medium py-3 px-3 rounded-lg transition-colors duration-200 ${isActive ? "text-[#d4a017] bg-gray-900" : "text-white hover:text-[#d4a017] hover:bg-gray-900"}`}>
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-gray-800 pt-3 mt-3 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/plataforma" className="block text-sm font-semibold py-3 px-3 rounded-lg text-center bg-[#d4a017] text-black">Plataforma</Link>
                <button onClick={handleLogout} className="block text-sm font-medium py-3 px-3 rounded-lg text-gray-400 hover:text-white text-left">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-sm font-medium py-3 px-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-colors">Login</Link>
                <Link href="/registre" className="block text-sm font-semibold py-3 px-3 rounded-lg text-center border border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017] hover:text-black transition-all">Cadastre-se</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
