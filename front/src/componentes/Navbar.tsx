/* eslint-disable @typescript-eslint/no-unused-vars */
// componentes/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import KinoLogo from "../../assets/img/KINO.png";

export default function Navbar() {
  // Simulacion del estado de autenticacion
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Datos del usuario (mock)
  const user = {
    name: "Valentin Fortunato",
    email: "gmailprueba@gmail.com",
    initials: "VF",
  };

  return (
    <nav className="bg-[#1a1a1a]/80 backdrop-blur-md sticky-top-0 z-50 px-8 py-4 flex items-center justify-between">
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
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 bg-[#F3CC63] rounded-full flex items-center justify-center font-bold text-black">
              {user.initials}
            </div>
            <div className="text-white">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
