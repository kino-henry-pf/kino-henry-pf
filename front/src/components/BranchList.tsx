// components/BranchList.tsx
import Link from 'next/link';
import BranchMap from '@/components/BranchMap';
import { Branch } from '@/types/branch';

interface BranchListProps {
  branches: Branch[];
  getLinkHref: (branchId: string) => string;
  loading?: boolean;
  title?: string;
}

export default function BranchList({ 
  branches, 
  getLinkHref, 
  loading = false,
  title = "Select a branch"
}: BranchListProps) {
  if (loading) {
    return (
      <main className="min-h-screen container-x-padding py-16">
        <h1 className="text-3xl font-bold mb-10">Loading branches...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen container-x-padding py-16">
      <h1 className="text-3xl font-bold mb-10">{title}</h1>

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
            <div className="p-6 hover:bg-[#1e1e1e] transition group">
              <Link 
                href={getLinkHref(branch.id)}
                className="block"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition">
                  {branch.name}
                </h2>

                <p className="text-sm text-gray-300 mb-4">{branch.address}</p>

                <span className="text-sm text-[var(--color-primary)] font-semibold">
                  See schedules
                </span>
              </Link>

              {/* BOTÓN EXTERNO PARA GOOGLE MAPS */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3 inline-block
                  text-xs px-3 py-1.5 rounded-full 
                  bg-blue-600 hover:bg-blue-700 
                  text-white transition
                "
              >
                How to get there
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}