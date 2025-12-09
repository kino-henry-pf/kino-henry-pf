"use client";

import { apiClient } from '@/services/apiClient';
import { Branch } from '@/types/branch';
import Link from 'next/link';
import BranchMap from '@/components/BranchMap';
import { useEffect, useState } from 'react';

export default function BranchSelectionPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const [movie, setMovie] = useState<string>('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { movie: movieId } = await params;
      setMovie(movieId);

      const api = apiClient();
      const branchesData = await api.get<Branch[]>('branches', {
        disableCache: true,
      });
      
      setBranches(branchesData);
      setLoading(false);
    };

    loadData();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen container-x-padding py-16">
        <h1 className="text-3xl font-bold mb-10">Cargando sucursales...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen container-x-padding py-16">
      <h1 className="text-3xl font-bold mb-10">Selecciona una sucursal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="
              rounded-xl border border-[var(--color-border)] 
              bg-[var(--background)] shadow-md overflow-hidden
            "
          >
            {/* MAPA */}
            <BranchMap
              latitude={branch.latitude}
              longitude={branch.longitude}
              branchName={branch.name}
            />

            {/* INFORMACIÓN */}
            <Link
              href={`/movies/${movie}/branches/${branch.id}`}
              className="
                block p-6 hover:bg-[#1e1e1e] transition 
                group
              "
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition">
                {branch.name}
              </h2>

              <p className="text-sm text-gray-300 mb-4">{branch.address}</p>

              {/* BOTONES */}
              <div className="flex gap-3 items-center">
                <span className="text-sm text-[var(--color-primary)] font-semibold">
                  Ver horarios
                </span>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    text-xs px-3 py-1.5 rounded-full 
                    bg-blue-600 hover:bg-blue-700 
                    text-white transition
                  "
                >
                  Cómo llegar
                </a>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
