
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { Showtime } from '@/types/showtime';
import Image from "next/image";

export interface MovieWithShowtimes extends Movie {
  showtimes: Showtime[];
}

export interface MovieShowtimesProps {
  movies: MovieWithShowtimes[];
  branchId: string;
}

export default function MovieShowtimes({ movies, branchId }: MovieShowtimesProps) {
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  if (!movies.length) {
    return (
      <main className="container-x-padding py-10">
        <h1 className="text-2xl font-bold mb-6">
          There are no movies available at this branch 😞
        </h1>
      </main>
    );
  }

  return (
    <main className="container-x-padding py-10">
      <h1 className="text-2xl font-bold mb-8">Available movies</h1>

      <div className="space-y-6">
        {movies.map((movie) => {
          
          return (
            <div
              key={movie.id}
              className="
                p-6 rounded-xl border border-[var(--color-border)] 
                bg-[var(--background)] flex gap-6 items-start
              "
            >
              {/* PELÍCULA - LADO IZQUIERDO */}
              <div className="flex-shrink-0">
                <Image
                  alt={movie.title}
                  src={movie.image}
                  width={80}
                  height={120}
                  className="w-full h-auto rounded-xl"
                />
  <h2 className="text-lg font-semibold mt-3">{movie.title}</h2>
  <p className="text-sm text-gray-400 mt-1">
    {movie.duration} min • {movie.genre}
  </p>
</div>

              {/* HORARIOS - LADO DERECHO */}
              <div className="flex-1">
                <h3 className="text-md font-semibold mb-4 text-gray-300">
                  Available times
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {movie.showtimes.map((showtime) => (
                    <Link
                      key={showtime.id}
                      href={`/movies/${movie.id}/branches/${branchId}/showtimes/${showtime.id}/seats`}
                      className="
                        px-4 py-2 rounded-lg 
                        border border-[var(--color-primary)] 
                        text-[var(--color-primary)]
                        hover:bg-[var(--color-primary)] 
                        hover:text-[var(--primary-foreground)]
                        transition font-semibold
                      "
                    >
                      {formatTime(showtime.startTime)}
                      <span className="text-xs block text-gray-400">
                        {showtime.format} • {showtime.language}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}