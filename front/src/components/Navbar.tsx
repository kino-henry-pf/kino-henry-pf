"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KinoLogo from "@/../public/logo.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "Valentin Fortunato",
    email: "gmailprueba@gmail.com",
    initials: "VF",
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setOpenMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-[#1a1a1a]/80 backdrop-blur-md relative z-[9999] sticky top-0 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href={"/"}>
        <Image
          src={KinoLogo}
          alt="Logo"
          width={100}
          height={40}
          className="cursor-pointer translate-y-4 hover:scale-105 transition"
        />
      </Link>

      {/* Menú Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn && (
          <>
            <Link
              href="/buscar"
              className="text-white hover:text-gray-300 transition"
            >
              Buscar
            </Link>
            <Link
              href="/login"
              className="text-white hover:text-gray-300 transition"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/register"
              className="bg-[#F3CC63] hover:bg-[#f6d783] text-black font-semibold px-6 py-2 rounded-full transition"
            >
              Crear cuenta
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition"
            >
              Buscar
            </Link>
            <Link
              href="/reservas"
              className="text-white hover:text-gray-300 transition"
            >
              Reservas
            </Link>

            <div
              className="flex items-center gap-3 cursor-pointer"
              ref={menuRef}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="w-12 h-12 bg-[#F3CC63] rounded-full flex items-center justify-center font-bold text-black">
                {user.initials}
              </div>
              <div className="text-white">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>

              {openMenu && (
                <div className="absolute right-0 top-16 w-48 bg-[#232323] border border-gray-700 rounded-xl shadow-xl p-2">
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/reservas"
                    className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    Mis reservas
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg cursor-pointer">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Botón Hamburguesa */}
      <button
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
      >
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* Menú Mobile */}
      {openMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 right-4 w-56 bg-[#232323] border border-gray-700 rounded-xl shadow-xl p-4 md:hidden"
        >
          {!isLoggedIn && (
            <div className="flex flex-col gap-3">
              <Link
                href="/buscar"
                className="text-white hover:text-gray-300 transition block"
                onClick={() => setOpenMobileMenu(false)}
              >
                Buscar
              </Link>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition block"
                onClick={() => setOpenMobileMenu(false)}
              >
                Iniciar sesion
              </Link>
              <Link
                href="/register"
                className="bg-[#F3CC63] hover:bg-[#f6d783] text-black font-semibold px-6 py-2 rounded-full transition block text-center"
                onClick={() => setOpenMobileMenu(false)}
              >
                Crear cuenta
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition block"
                onClick={() => setOpenMobileMenu(false)}
              >
                Buscar
              </Link>
              <Link
                href="/reservas"
                className="text-white hover:text-gray-300 transition block"
                onClick={() => setOpenMobileMenu(false)}
              >
                Reservas
              </Link>
              <Link
                href="/perfil"
                className="text-white hover:text-gray-300 transition block"
                onClick={() => setOpenMobileMenu(false)}
              >
                Mi perfil
              </Link>
              <button className="text-left text-red-400 hover:text-red-500 transition">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
