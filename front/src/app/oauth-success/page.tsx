"use client";

import { useSearchParams } from "next/navigation";
import OauthSuccessPage from "./oauthSuccess";

export default function OauthSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <OauthSuccessPage token={token} />;
}