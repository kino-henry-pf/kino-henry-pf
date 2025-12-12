import { Movie } from "./movie";

export type Showtime = {
  id: string;
  movieId: string;
  movie: Movie,
  roomId: string;
  startTime: string; // ISO string from backend
  language: 'dubbed' | 'subtitled';
  format: '2D' | '3D';
  room: {
    id: string;
    name: string;
    branchId: string;
  };
};
