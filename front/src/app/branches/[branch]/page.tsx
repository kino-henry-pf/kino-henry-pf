import { apiClient } from '@/services/apiClient';
import MovieShowtimes, { MovieShowtimesProps, MovieWithShowtimes } from '@/components/MovieShowtimes';
import { Showtime } from '@/types/showtime';

export default async function BranchMoviesPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  const api = apiClient();
  
  // Obtenemos todas las películas con sus horarios para esta sucursal
  const moviesWithShowtimes = await api.get<MovieWithShowtimes[]>(
    `branches/${branch}/showtimes`,
    { disableCache: true }
  );

  return (
    <MovieShowtimes 
      movies={moviesWithShowtimes} 
      branchId={branch}
    />
  );
}