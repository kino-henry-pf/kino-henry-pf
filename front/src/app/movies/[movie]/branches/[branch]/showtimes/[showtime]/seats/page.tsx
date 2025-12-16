'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/services/apiClient';
import { Seat } from '@/types/seat';
import { Showtime } from '@/types/showtime';
import { Movie } from '@/types/movie';
import { Branch } from '@/types/branch';
import Image from 'next/image';
import Link from 'next/link';

type Params = {
  movie: string;
  branch: string;
  showtime: string;
};

type LoadedData = {
  movie: string;
  branch: string;
  showtime: string;
  showtimeData: Showtime;
  movieData: Movie;
  branchData: Branch;
  seats: Seat[];
};

export default function SeatsPage({ params }: { params: Promise<Params> }) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [data, setData] = useState<LoadedData | null>(null);

  useEffect(() => {
    async function loadData() {
      const { movie, branch, showtime } = await params;
      const api = apiClient();

      const showtimeData = await api.get<Showtime>(`showtimes/${showtime}`, {
        disableCache: true,
      });
      const movieData = await api.get<Movie>(`movies/${movie}`, {
        disableCache: true,
      });
      const branchData = await api.get<Branch>(`branches/${branch}`, {
        disableCache: true,
      });
      const seats = await api.get<Seat[]>(`seats/room/${showtimeData.roomId}`, {
        disableCache: true,
      });

      setData({
        movie,
        branch,
        showtime,
        showtimeData,
        movieData,
        branchData,
        seats,
      });
    }

    loadData();
  }, [params]);

  if (!data) return <p className="p-10">Loading seats...</p>;

  const {
    movieData,
    branchData,
    showtimeData,
    seats,
    movie,
    branch,
    showtime,
  } = data;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

  const seatsByRow: Record<string, Seat[]> = {};
  rows.forEach((row) => {
    seatsByRow[row] = seats
      .filter((seat) => seat.row === row)
      .sort((a, b) => a.number - b.number);
  });

  const toDate = (value: string) => new Date(value.replace(' ', 'T'));

  const formatDate = (dateString: string) => {
    const date = toDate(dateString);

    return new Intl.DateTimeFormat('en-US', {
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
  const formattedDate = formatDate(showtimeData.startTime);

  const toggleSeat = (seat: Seat) => {
    if (seat.reserved) return;

    const exists = selectedSeats.some((s) => s.id === seat.id);

    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <main className="container-x-padding py-10">
      <div className="flex gap-12 items-start">
        <aside className="w-72 bg-[#1a1a1a] p-5 rounded-xl border border-[var(--color-border)] mr-auto">
          <Image
            src={movieData.image}
            alt={movieData.title}
            width={300}
            height={450}
            className="w-full rounded-lg mb-4"
            loading="eager"
          />

          <h2 className="text-xl font-bold mb-1">{movieData.title}</h2>
          <p className="text-gray-400 text-sm mb-1">{branchData.name}</p>
          <p className="text-gray-300 text-sm">{formattedDate}</p>

          {selectedSeats.length > 0 && (
            <div className="mt-5 text-sm text-gray-300">
              <p className="font-semibold mb-1">Selected seats:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-1 bg-gray-800 rounded text-[var(--color-primary)]"
                  >
                    {s.row}
                    {s.number}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="flex-1 max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Select your seats</h1>

          <div className="flex flex-col gap-3 mb-8">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-3">
                <div className="text-[var(--color-primary)] w-10 text-right">
                  {row}
                </div>

                <div className="grid grid-cols-12 gap-1">
                  {seatsByRow[row].map((seat) => {
                    const isSelected = selectedSeats.some(
                      (s) => s.id === seat.id
                    );

                    return (
                      <div
                        key={seat.id}
                        onClick={() => toggleSeat(seat)}
                        className={`
                          h-10 w-10 flex items-center justify-center rounded text-sm
                          transition
                          ${
                            seat.reserved
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[var(--color-primary)] text-black'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-600 cursor-pointer'
                          }
                        `}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selectedSeats.length > 0 && (
            <Link
              className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-black font-semibold rounded hover:bg-yellow-100 cursor-pointer transition"
              href={{
                pathname: `/movies/${movie}/branches/${branch}/showtimes/${showtime}/products`,
                query: {
                  seats: selectedSeats
                    .map((s) => `${s.row}${s.number}`)
                    .join(','), // For display
                  seatIds: selectedSeats.map((s) => s.id).join(','), // For backend
                },
              }}
            >
              Continue to products
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
