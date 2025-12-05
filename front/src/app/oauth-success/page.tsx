"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

export default function OauthSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { setDataUser } = useAuth();
  const token = searchParams.token;

  useEffect(() => {
    console.log("TOKEN RECIBIDO DESDE URL:", token);

    if (!token) return;

    const session = {
      message: true,
      access_token: token,
      user: {
        id: "",
        name: "",
        email: "",
        role: "user",
      },
    };

    localStorage.setItem("userSession", JSON.stringify(session));
    setDataUser(session);

    window.location.href = "/";
  }, [token]);

  return <p>Procesando login...</p>;
}