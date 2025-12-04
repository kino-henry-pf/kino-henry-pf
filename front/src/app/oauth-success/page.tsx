"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OauthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Guardar token
      localStorage.setItem("userSession", token);

      // Redirigir al home
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      Procesando token...
    </div>
  );
}