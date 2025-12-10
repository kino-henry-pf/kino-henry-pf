import { apiClient } from '@/services/apiClient';
import { Showtime } from '@/types/showtime';
import Link from 'next/link';

export default async function ShowtimesPage({
  params,
}: {
  params: Promise<{ movie: string; branch: string }>;
}) {
  const { movie, branch } = await params;

  const api = apiClient();
  const showtimes = await api.get<Showtime[]>(
    `showtimes/movie/${movie}/branch/${branch}`,
    { disableCache: true }
  );

  if (!showtimes.length) {
    return (
      <main className="p-10">
        <h1>No hay horarios disponibles 😞</h1>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .format(date)
      .replace('.', '');
  };

  return (
    <main className="container-x-padding py-10">
      <h1 className="text-2xl font-bold mb-6">Horarios disponibles</h1>

      <div className="grid grid-cols-1 gap-6">
        {showtimes.map((show) => (
          <div
            key={show.id}
            className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--background)]"
          >
            <h2 className="text-xl font-semibold">
              {formatDate(show.startTime)}
            </h2>

            <p className="mt-2 text-gray-400">
              Sala: {show.room.name} • {show.language} • {show.format}
            </p>

            <Link
              href={`/movies/${movie}/branches/${branch}/showtimes/${show.id}/seats`}
            >
              <button className="mt-4 px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--primary-foreground)] font-bold cursor-pointer">
                Seleccionar
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
