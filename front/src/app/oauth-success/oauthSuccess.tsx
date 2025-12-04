"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

interface Props {
  token: string | null;
}

function OauthSuccessPage({ token }: Props) {
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

    localStorage.setItem("userSession", JSON.stringify(session));

    setDataUser(session);

    // Redirigir al home
    window.location.href = "/";
  }, [token]);
  
    redirect("/");

  return(
     <p>Procesando login...</p>
  )
}
