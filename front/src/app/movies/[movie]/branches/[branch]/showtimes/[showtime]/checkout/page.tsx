'use client';

import { use, useEffect, useState } from 'react';
import { apiClient } from '@/services/apiClient';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { Branch } from '@/types/branch';
import { Product } from '@/types/product';

type SearchParams = {
  seats?: string; // A1,A2,...
  seatIds?: string; // uuid,uuid
  products?: string; // productId:qty,productId:qty
};

export default function CheckoutSummary({
  params,
  searchParams,
}: {
  params: Promise<{ movie: string; branch: string; showtime: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const api = apiClient();

  // Required unwrapping (React 19)
  const { movie, branch, showtime } = use(params);
  const unwrappedSearch = use(searchParams);

  // -------------------------------
  // Seats
  // -------------------------------
  const seatLabels = unwrappedSearch.seats?.split(',') ?? [];
  const seatIds = unwrappedSearch.seatIds?.split(',') ?? [];

  // -------------------------------
  // Parse products string
  // Format: productId:qty,productId:qty
  // -------------------------------
  const productQuantities: Record<string, number> = {};

  if (unwrappedSearch.products) {
    for (const item of unwrappedSearch.products.split(',')) {
      const [id, qty] = item.split(':');
      if (id && qty) productQuantities[id] = Number(qty);
    }
  }

  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [branchData, setBranchData] = useState<Branch | null>(null);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Load movie / branch / product info once
  // -------------------------------
  useEffect(() => {
    async function load() {
      const movieRes = await api.get<Movie>(`movies/${movie}`);
      const branchRes = await api.get<Branch>(`branches/${branch}`);
      const allProducts = await api.get<Product[]>(`products`);

      setMovieData(movieRes);
      setBranchData(branchRes);

      const selected = allProducts.filter((p) => productQuantities[p.id] > 0);
      setProductsData(selected);
    }

    load();
  }, [movie, branch]); // << NO "api" here — prevents infinite loop

  if (!movieData || !branchData) {
    return <p className="p-10">Cargando resumen...</p>;
  }

  // -------------------------------
  // Totals
  // -------------------------------
  const ticketPrice = 75;
  const ticketsTotal = seatIds.length * ticketPrice;

  const productsTotal = productsData.reduce(
    (sum, p) => sum + p.price * (productQuantities[p.id] || 0),
    0
  );

  const finalTotal = ticketsTotal + productsTotal;

  // -------------------------------
  // Final Step:
  // CREATE RESERVATION → CREATE ORDER → CREATE PAYMENT SESSION
  // -------------------------------
  const handlePayNow = async () => {
    try {
      setLoading(true);

      const sessionStr = localStorage.getItem('userSession');
      if (!sessionStr) throw new Error('No session found');
      const session = JSON.parse(sessionStr);

      const userId = session.user.id;

      // 1️⃣ CREATE RESERVATION
      const reservation = await api.post('reservations', {
        userId,
        showtimeId: showtime,
        seatIds,
      });

      const seatReservationIds = reservation.seats.map(
        (s: { id: string }) => s.id
      );

      // 2️⃣ PRODUCT PAYLOAD
      const productsPayload = productsData.map((p) => ({
        productId: p.id,
        quantity: productQuantities[p.id],
      }));

      // 3️⃣ CREATE ORDER
      const order = await api.post('orders', {
        userId,
        branchId: branch,
        seatReservationIds,
        products: productsPayload,
      });

      const orderId = order.id;

      // 4️⃣ CREATE PAYMENT SESSION
      const payment = await api.post('payments/checkout', {
        orderId,
      });

      console.log('PAYMENT SESSION:', payment);

      // 5️⃣ Redirect to Stripe session if backend returns a URL
      if (payment.url) {
        window.location.href = payment.url;
      } else {
        alert('Payment created, but no redirect URL found.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Error durante el checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-x-padding py-10">
      <h1 className="text-3xl font-bold mb-8">Resumen de compra</h1>

      {/* Movie info */}
      <section className="flex gap-10 mb-10">
        <Image
          src={movieData.image}
          alt={movieData.title}
          width={200}
          height={300}
          className="rounded-xl"
        />

        <div>
          <h2 className="text-2xl font-bold">{movieData.title}</h2>
          <p className="text-gray-400">{branchData.name}</p>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">Asientos seleccionados</h3>
            <p className="text-gray-300">{seatLabels.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Productos seleccionados</h3>

        {productsData.length === 0 && (
          <p className="text-gray-400">No agregaste productos.</p>
        )}

        {productsData.length > 0 && (
          <div className="flex flex-col gap-3">
            {productsData.map((product) => (
              <div key={product.id} className="flex justify-between">
                <span>
                  {product.name} × {productQuantities[product.id]}
                </span>
                <span>${product.price * productQuantities[product.id]}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Totals */}
      <section className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Totales</h3>

        <div className="flex justify-between mb-2">
          <span>Boletos ({seatIds.length})</span>
          <span>${ticketsTotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Productos</span>
          <span>${productsTotal}</span>
        </div>

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${finalTotal}</span>
        </div>
      </section>

      {/* Pay button */}
      <div className="mt-10 flex justify-end">
        <button
          disabled={loading}
          onClick={handlePayNow}
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-black text-lg font-semibold cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Procesando…' : 'Pagar ahora'}
        </button>
      </div>
    </main>
  );
}
