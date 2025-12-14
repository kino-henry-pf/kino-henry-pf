"use client";

import { Suspense } from "react";
import OAuthSuccessPage from "@/components/OauthSuccess";

export default function LoginGoogle() {
  return (
    <Suspense fallback={<p>Processing login...</p>}>
      <OAuthSuccessPage />
    </Suspense>
  );
}