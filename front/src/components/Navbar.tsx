/* eslint-disable @typescript-eslint/no-unused-vars */
// componentes/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KinoLogo from "@/../public/logo.png";
import Avatar from "./Avatar";

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
    <nav className="bg-[var(--background)]/50 backdrop-blur-xl relative z-[9999] sticky top-0 z-50 container-x-padding py-4 flex items-center justify-between">
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
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 cursor-pointer group rounded-full bg-white/10 p-2 pr-6 max-w-58 user-select-none"
          ref={menuRef}
          onClick={() => setOpenMenu(!openMenu)}
          >
            <Avatar>{user.name}</Avatar>
            <div className="text-white max-w-full">
              <p className="font-semibold w-full whitespace-nowrap text-ellipsis overflow-hidden text-md">{user.name}</p>
              <p className="text-sm text-gray-400 w-full whitespace-nowrap text-ellipsis overflow-hidden">{user.email}</p>
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
