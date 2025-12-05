"use client";

import { Suspense } from "react";
import OAuthSuccessPage from "@/components/OauthSuccess";

export default function LoginGoogle() {
  return (
    <Suspense fallback={<p>Procesando login...</p>}>
      <OAuthSuccessPage />
    </Suspense>
  );
}