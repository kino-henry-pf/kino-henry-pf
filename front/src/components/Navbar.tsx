"use client";

import Link from "next/link";
import Image from "next/image";
import KinoLogo from "@/../public/logo.png";
import UserButton from "./UserButton";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export default function Navbar() {
  const { dataUser } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <nav className="bg-[var(--background)]/50 backdrop-blur-xl relative z-[9999] sticky top-0 container-x-padding py-4 flex items-center justify-between">
      
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

      {/* INPUT DE BUSQUEDA (si showSearch === true) */}
      {showSearch && (
        <input
          autoFocus
          type="text"
          placeholder="Buscar película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-full w-64 bg-gray-800 text-white border border-gray-600 outline-none"
        />
      )}

      {/* NAVBAR */}
      <div className="flex items-center gap-6">
        
        {/* BOTÓN BUSCAR */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-white hover:text-gray-300 transition cursor-pointer"
        >
          Buscar
        </button>

        {/* Si NO está logueado */}
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

        {/* Si SÍ está logueado */}
        {dataUser && (
          <>
            <Link href="/bookings" className="text-white hover:text-gray-300 transition">
              Mis reservas
            </Link>
            <UserButton user={dataUser} />
          </>
        )}

      </div>
    </nav>
  );
}