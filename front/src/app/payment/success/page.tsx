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
      <h1 className="text-3xl font-bold text-green-600">Pago exitoso!</h1>

      <p className="mt-4 text-lg text-gray-400">
        Tu orden fue procesada correctamente. En unos instantes recibirás tus
        entradas a tu correo.
      </p>

      <p className="mt-2 text-gray-500">Order ID: {searchParams.orderId}</p>
      <Link href="/" className="mt-6">
        <Button>Volver al inicio</Button>
      </Link>
    </main>
  );
}
