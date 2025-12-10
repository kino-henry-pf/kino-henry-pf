'use client';

import { apiClient } from '@/services/apiClient';
import { useState, useEffect, use } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type SearchParams = {
  seats?: string; // A1,B2,C3
  seatIds?: string; // uuid1,uuid2,uuid3
};

export default function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ movie: string; branch: string; showtime: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const router = useRouter();
  const api = apiClient();

  // unwrap promises (React 19)
  const { movie, branch, showtime } = use(params);
  const unwrappedSearch = use(searchParams);

  const selectedSeatsLabels = unwrappedSearch.seats?.split(',') ?? [];
  const selectedSeatIds = unwrappedSearch.seatIds?.split(',') ?? [];

  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // -------------------------
  // FIXED useEffect dependency
  // -------------------------
  useEffect(() => {
    async function load() {
      const p = await api.get<Product[]>('products');
      setProducts(p);
    }
    load();
    // ❌ DO NOT include "api" here, it causes infinite re-renders
  }, []);

  const updateQuantity = (id: string, amount: number) => {
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) + amount;
      return { ...prev, [id]: Math.max(next, 0) };
    });
  };

  // -------------------------
  // NEXT STEP → GOTO CHECKOUT SUMMARY PAGE
  // -------------------------
  const goToCheckout = () => {
    setLoading(true);

    const productPayload = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => `${productId}:${qty}`)
      .join(',');

    const query = new URLSearchParams({
      seats: selectedSeatsLabels.join(','),
      seatIds: selectedSeatIds.join(','),
      products: productPayload, // example: id1:2,id2:1
    }).toString();

    router.push(
      `/movies/${movie}/branches/${branch}/showtimes/${showtime}/checkout?${query}`
    );
  };

  return (
    <main className="container-x-padding py-10">
      <h1 className="text-2xl font-bold mb-6">Agrega productos opcionales</h1>

      <p className="text-gray-400 mb-6">
        Asientos seleccionados:{' '}
        <strong>{selectedSeatsLabels.join(', ')}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-[#1a1a1a] rounded-xl border border-[var(--color-border)]"
          >
            <div className="w-full h-40 overflow-hidden rounded mb-3 bg-black/20 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={160}
                height={160}
                className="object-contain max-h-40"
              />
            </div>

            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-400 mb-3">${product.price}</p>

            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 bg-gray-700 rounded cursor-pointer"
                onClick={() => updateQuantity(product.id, -1)}
              >
                -
              </button>

              <span>{quantities[product.id] ?? 0}</span>

              <button
                className="px-3 py-1 bg-[var(--color-primary)] text-black rounded cursor-pointer"
                onClick={() => updateQuantity(product.id, +1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-10 w-full flex justify-end">
        <button
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-black text-lg font-semibold cursor-pointer disabled:opacity-50"
          onClick={goToCheckout}
        >
          {loading ? 'Procesando...' : 'Continuar al checkout'}
        </button>
      </div>
    </main>
  );
}
