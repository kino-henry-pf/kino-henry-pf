'use client';

import { use, useEffect, useState } from 'react';
import { apiClient } from '@/services/apiClient';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { Branch } from '@/types/branch';
import { Product } from '@/types/product';
import toast from 'react-hot-toast';

type SearchParams = {
  seats?: string;
  seatIds?: string;
  products?: string;
};

type ReservationResponse = {
  seats: { id: string }[];
};

type OrderResponse = {
  id: string;
};

type PaymentResponse = {
  url?: string;
};

export default function CheckoutSummary({
  params,
  searchParams,
}: {
  params: Promise<{ movie: string; branch: string; showtime: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const api = apiClient();

  const { movie, branch, showtime } = use(params);
  const unwrappedSearch = use(searchParams);

  const seatLabels = unwrappedSearch.seats?.split(',') ?? [];
  const seatIds = unwrappedSearch.seatIds?.split(',') ?? [];

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

  useEffect(() => {
    async function load() {
      const movieRes = await api.get<Movie>(`movies/${movie}`, {
        disableCache: true,
      });
      const branchRes = await api.get<Branch>(`branches/${branch}`, {
        disableCache: true,
      });
      const allProducts = await api.get<Product[]>(`products`, {
        disableCache: true,
      });

      setMovieData(movieRes);
      setBranchData(branchRes);

      const selected = allProducts.filter((p) => productQuantities[p.id] > 0);
      setProductsData(selected);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, branch]);

  if (!movieData || !branchData) {
    return <p className="p-10">Loading summary...</p>;
  }

  const ticketPrice = 75;
  const ticketsTotal = seatIds.length * ticketPrice;

  const productsTotal = productsData.reduce(
    (sum, p) => sum + Number(p.price) * (productQuantities[p.id] || 0),
    0
  );

  const finalTotal = ticketsTotal + productsTotal;

  const handlePayNow = async () => {
    try {
      setLoading(true);

      const sessionStr = localStorage.getItem('userSession');
      if (!sessionStr) throw new Error('No session found');

      const session = JSON.parse(sessionStr);
      const userId = session.user.id;
      const token = session.access_token;

      const api = apiClient({
        bearerToken: token,
      });

      const reservation = await api.post<ReservationResponse>('reservations', {
        userId,
        showtimeId: showtime,
        seatIds,
      });

      const seatReservationIds = reservation.seats.map((s) => s.id);

      const productsPayload = productsData.map((p) => ({
        productId: p.id,
        quantity: productQuantities[p.id],
      }));

      const order = await api.post<OrderResponse>('orders', {
        userId,
        branchId: branch,
        seatReservationIds,
        products: productsPayload,
      });

      const payment = await api.post<PaymentResponse>('payments/checkout', {
        orderId: order.id,
      });

      if (payment.url) {
        window.location.href = payment.url;
      }
    } catch {
      toast.error('❌ Error during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-x-padding py-10">
      <h1 className="text-3xl font-bold mb-8">Purchase summary</h1>

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
            <h3 className="font-semibold text-lg">Selected seats</h3>
            <p className="text-gray-300">{seatLabels.join(', ')}</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Selected products</h3>

        {productsData.length === 0 && (
          <p className="text-gray-400">You did not add any products.</p>
        )}

        {productsData.length > 0 && (
          <div className="flex flex-col gap-3">
            {productsData.map((product) => (
              <div key={product.id} className="flex justify-between">
                <span>
                  {product.name} × {productQuantities[product.id]}
                </span>
                <span>
                  ${Number(product.price) * productQuantities[product.id]}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Totals</h3>

        <div className="flex justify-between mb-2">
          <span>Tickets ({seatIds.length})</span>
          <span>${ticketsTotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Products</span>
          <span>${productsTotal}</span>
        </div>

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${finalTotal}</span>
        </div>
      </section>

      <div className="mt-10 flex justify-end">
        <button
          disabled={loading}
          onClick={handlePayNow}
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-black text-lg font-semibold cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </main>
  );
}
