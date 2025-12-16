import OAuthSuccessPage from "@/components/OauthSuccess";

export default async function LoginGoogle({
  searchParams
}: {
  searchParams: Promise<{
    token: string
  }>
}) {
  const {token} = await searchParams

  return (
    <OAuthSuccessPage token={token} />
  );
}