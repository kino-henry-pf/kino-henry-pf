"use client"

import Link from "next/link"

export default function PageError() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4">
      
      <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        
        <div className="text-yellow-500 text-6xl mb-4 select-none">🚫</div>

        <h1 className="text-3xl font-bold mb-3">
          Acceso restringido
        </h1>

        <p className="text-zinc-400 mb-8">
          Solo los administradores pueden entrar a esta sección.
        </p>

        <Link href="/">
          <button className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition cursor-pointer">
            Volver al inicio
          </button>
        </Link>

      </div>

    </div>
  )
}