import Button from '@/components/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function FailurePage(props: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const searchParams = await props.searchParams;
  if (!searchParams.orderId) redirect('/');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-red-600">Failed payment</h1>

      <p className="mt-4 text-lg text-gray-400 text-center max-w-md">
       There was a problem processing your payment. Your account was not charged.
      </p>

      <p className="mt-2 text-gray-500">Order ID: {searchParams.orderId}</p>

      <div className="flex gap-4 mt-6">
        <Link href="/">
          <Button primary={false}>Back to home</Button>
        </Link>
        <Link href={`/checkout?orderId=${searchParams.orderId}`}>
          <Button>try again</Button>
        </Link>
      </div>
    </main>
  );
}
