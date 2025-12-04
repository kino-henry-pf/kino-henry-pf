"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

interface Props {
  token: string | null;
}

export default function OauthSuccessPage({ token }: Props) {
  const { setDataUser } = useAuth();

  useEffect(() => {
    if (!token) return;

    const session = {
      message: true,
      access_token: token,
      user: {
        id: "",
        name: "",
        email: "",
        role: ""
      }
    };

    // Guardar sesión
    localStorage.setItem("userSession", JSON.stringify(session));

    // Setear contexto
    setDataUser(session);

    // Redirigir al home
    window.location.href = "/";
  }, [token]);

  return <p>Procesando login...</p>;
}