"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import KinoLogo from "@/../public/logo.png";
import { User } from "@/types/user";
import UserButton from "./UserButton";

export default function Navbar() {
  // Simulacion del estado de autenticacion
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);

  // Datos del usuario (mock)
  const user: User = {
    id: "uuid",
    name: "Valentin Fortunato",
    email: "gmailprueba@gmail.com",
    address: "123 av siempreviva",
    roles: "admin"
  };

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
            className="bg-[var(--color-primary)] hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--primary-foreground)] font-semibold px-6 py-3 rounded-full transition-colors duration-200"
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
            href="/dashboard"
            className="text-white hover:text-gray-300 transition"
          >
            Reservas
          </Link>

          {/* Avatar con dropdown (opcional) */}
          <UserButton
            user={user}
          />
        </div>
      )}
    </nav>
  );
}
