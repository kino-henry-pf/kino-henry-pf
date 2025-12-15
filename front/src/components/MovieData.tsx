import { Movie } from '@/types/movie';
import Rating from './Rating';
import Image from 'next/image';
import Button from './Button';
import { Fragment } from 'react/jsx-runtime';
import Link from 'next/link';

export default function MovieData({
  movie,
  actions,
  quoteAction = true
}: {
  movie: Movie;
  actions?: React.ReactNode[];
  quoteAction?: boolean
}) {
  return (
    <article className="max-w-full w-full lg:w-[800px] h-full items-center lg:grid lg:grid-cols-[auto_1fr] gap-15 lg:grid-rows-1 grid-cols-1 relative lg:rounded-none rounded-2xl overflow-hidden">
      <Image
        width={267}
        height={400}
        alt={movie.title}
        src={movie.image}
        className="h-full lg:w-auto w-full rounded-2xl object-cover"
      />
      <div className="w-full h-fit flex flex-col gap-5 lg:relative lg:bottom-unset lg:top-0 lg:left-0 absolute bottom-0 left-0 p-10 lg:p-0 bg-black/60 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
        <h2 className="text-5xl font-bold">{movie.title}</h2>
        <div className="flex items-center gap-2 font-bold">
          <Rating value={movie.rating} />
          <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
          <span>Available now!</span>
        </div>
        <p>{movie.synopsis}</p>
        <nav className="w-fit flex items-center gap-4">
          {
            quoteAction && <Link href={`/movies/${movie.id}/branches`}>
              <Button rounded>Quote ticket</Button>
            </Link>
          }
          {actions &&
            actions.map((action, index) => (
              <Fragment key={index}>{action}</Fragment>
            ))}
        </nav>
      </div>
    </article>
  );
}
