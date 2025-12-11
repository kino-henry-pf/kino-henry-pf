import Button from '@/components/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SuccessPage(props: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const searchParams = await props.searchParams;
  if (!searchParams.orderId) redirect('/');
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-green-600">Successful payment!</h1>

      <p className="mt-4 text-lg text-gray-400">
        Your order was processed successfully. You will receive your tickets in your email shortly.
      </p>

      <p className="mt-2 text-gray-500">Order ID: {searchParams.orderId}</p>
      <Link href="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </main>
  );
}
