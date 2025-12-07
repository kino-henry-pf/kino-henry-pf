
"use client";

import Link from "next/link";
import Image from "next/image";
import KinoLogo from "@/../public/logo.png";
import UserButton from "./UserButton";
import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const { dataUser } = useAuth();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    clearSearch();
    setIsMenuOpen(false);
  }, [pathname]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowSearch(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/movies?title=${encodeURIComponent(query)}`,
        );

        const data = await res.json();

        const fixedMovies = data.map((m: any) => ({
          ...m,
          image: m.image || m.poster || m.imageURL || "/fallback.jpg",
        }));

        setResults(fixedMovies);
      } catch (error) {
        console.error("Error buscando películas:", error);
      }
    };

    const delay = setTimeout(fetchMovies, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <nav className="bg-[var(--background)]/50 backdrop-blur-xl relative z-[9999] sticky top-0 container-x-padding py-4 flex flex-col gap-4">
      {/* PARTE SUPERIOR */}
      <div className="flex items-center h-full justify-between">
        {/* LOGO */}
        <Link href={"/"}>
          <Image
            src={KinoLogo}
            alt="Logo"
            width={100}
            height={40}
            className="cursor-pointer translate-y-4 hover:scale-105 transition"
          />
        </Link>

        {/* INPUT DE BÚSQUEDA - Desktop */}
        {showSearch && (
          <input
            autoFocus
            type="text"
            placeholder="Buscar película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="hidden md:block px-4 py-2 rounded-full w-64 bg-gray-800 text-white border border-gray-600 outline-none"
          />
        )}

        {/* HAMBURGER BUTTON - Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-gray-300 transition z-50"
          aria-label="Menú"
        >
          {isMenuOpen ? (
            // Icono X para cerrar
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Icono hamburguesa
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* NAV ITEMS - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* BOTÓN BUSCAR */}
          <button
            onClick={() => {
              if (showSearch) {
                clearSearch();
              } else {
                setShowSearch(true);
              }
            }}
            className="text-white hover:text-gray-300 transition cursor-pointer"
          >
            Buscar
          </button>

          <Link
            href="/products"
            className="text-white hover:text-gray-300 transition"
          >
            Menú
          </Link>

          {!dataUser && (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="bg-[var(--color-primary)] hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--primary-foreground)] font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Crear cuenta
              </Link>
            </>
          )}

          {dataUser && (
            <>
              <Link
                href="/bookings"
                className="text-white hover:text-gray-300 transition"
              >
                Mis reservas
              </Link>

              <UserButton user={dataUser} />
            </>
          )}
        </div>
      </div>

      {/* MENÚ MOBILE - Desplegable */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4 border-t border-gray-700 pt-4">
          {/* INPUT DE BÚSQUEDA - Mobile */}
          <input
            type="text"
            placeholder="Buscar película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
            className="px-4 py-2 rounded-full w-full bg-gray-800 text-white border border-gray-600 outline-none"
          />

          <Link
            href="/products"
            className="text-white hover:text-gray-300 transition py-2"
          >
            Menú
          </Link>

          {!dataUser && (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition py-2"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="bg-[var(--color-primary)] hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--primary-foreground)] font-semibold px-6 py-3 rounded-full transition-colors text-center"
              >
                Crear cuenta
              </Link>
            </>
          )}

          {dataUser && (
            <>
              <Link
                href="/bookings"
                className="text-white hover:text-gray-300 transition py-2"
              >
                Mis reservas
              </Link>

              <div className="pt-2">
                <UserButton user={dataUser} />
              </div>
            </>
          )}
        </div>
      )}

      {/* INPUT DE BÚSQUEDA - Mobile (cuando showSearch está activo) */}
      {showSearch && (
        <input
          autoFocus
          type="text"
          placeholder="Buscar película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:hidden px-4 py-2 rounded-full w-full bg-gray-800 text-white border border-gray-600 outline-none"
        />
      )}

      {/* RESULTADOS */}
      {showSearch && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-4">
          {results.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </nav>
  );
}
