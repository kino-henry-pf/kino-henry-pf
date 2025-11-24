'use client'

import React, { useState } from "react";
import KinoLogo from "../../assets/img/KINO.png";
import Image from "next/image";

function Register() {
   const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
  });

  const handleOnClick = () => {
    window.location.href = "/login"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setForm({
      nombre: "",
      email: "",
      password: "",
      direccion: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#121212]">
        <Image
          src={KinoLogo} 
          alt="Kino Logo"
          width={200} 
          height={100} 
          priority
          className="mb-6"
        />
      <form
        onSubmit={handleSubmit}
        className="bg-white/3 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Registro</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#3d3c3c] text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#3d3c3c] text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#3d3c3c] text-white"
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#3d3c3c] text-white"
          required
        />

        <button
        onClick={handleOnClick}
          type="submit"
          className="w-full bg-[#F3CC63] hover:bg-[#f6d783] transition p-2 rounded font-semibold text-black"
        >
          Registrarse
        </button>
        <p className="p-2">Ya tenes cuenta? <a className="text-blue-300 text-center" href="/login">Iniciar Sesion</a></p>
      </form>
    </div>
  );
};

export default Register;