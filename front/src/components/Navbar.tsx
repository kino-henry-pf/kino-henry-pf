/* eslint-disable @typescript-eslint/no-unused-vars */
// componentes/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KinoLogo from "@/../public/logo.png";

export default function Navbar() {
  // Simulacion del estado de autenticacion
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Datos del usuario (mock)
  const user = {
    name: "Valentin Fortunato",
    email: "gmailprueba@gmail.com",
    initials: "VF",
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-[#1a1a1a]/80 backdrop-blur-md relative z-[9999] sticky-top-0 z-50 px-8 py-4 flex items-center justify-between">
      {/* Logo - siempre visible */}
      <Link href={"/"}>
        <Image
          src={KinoLogo}
          alt="Logo"
          width={100}
          height={40}
          className="cursor-pointer translate-y-4 hover: transform hover:scale-105 transition"
        />
      </Link>

      {/* Navbar cuando NO está logueado */}
      {!isLoggedIn && (
        <div className="flex items-center gap-6">
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
        </div>
      )}

      {/* Navbar cuando SÍ está logueado */}
      {isLoggedIn && (
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white hover:text-gray-300 transition">
            Buscar
          </Link>
          <Link
            href="/reservas"
            className="text-white hover:text-gray-300 transition"
          >
            Reservas
          </Link>

          {/* Avatar con dropdown (opcional) */}
          <div className="flex items-center gap-3 cursor-pointer group"
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

            {/* Menu desplegable*/}
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
                <button
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
