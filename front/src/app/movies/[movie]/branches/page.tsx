import { apiClient } from '@/services/apiClient';
import { Branch } from '@/types/branch';
import Link from 'next/link';

export default async function BranchSelectionPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie } = await params;
  const api = apiClient();

  const branches = await api.get<Branch[]>('branches', {
    disableCache: true,
  });

  return (
    <main className="min-h-screen container-x-padding py-16">
      <h1 className="text-3xl font-bold mb-10">Selecciona una sucursal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <Link
            key={branch.id}
            href={`/movies/${movie}/branches/${branch.id}/showtimes`}
            className="
              block p-6 rounded-xl border border-[var(--color-border)] 
              bg-[var(--background)] hover:bg-[#1e1e1e] transition 
              hover:border-[var(--color-primary)] group shadow-md
            "
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition">
              {branch.name}
            </h2>

            <p className="text-sm text-gray-300">{branch.address}</p>

            <div className="mt-4 text-sm text-[var(--color-primary)] font-semibold">
              Ver horarios →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
