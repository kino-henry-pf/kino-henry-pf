"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { userSessionInterface } from "@/types/userSession";

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { setDataUser } = useAuth();

  useEffect(() => {
    if (!token) return;

    const session: userSessionInterface = {
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

    window.location.href = "/";
  }, [token]);

  return <p>Procesando login...</p>;
}