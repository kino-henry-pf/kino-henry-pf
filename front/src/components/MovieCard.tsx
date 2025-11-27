import { Movie } from "@/types/movie";
import Image from "next/image";

export default function MovieCard({
    movie
}: {
    movie: Movie
}) {
    return (
        <a href={`/movie/${movie.id}`} className="w-full h-auto overflow-hidden cursor-pointer">
            <Image
                alt={movie.title}
                src={movie.image}
                width={267}
                height={400}
                className="w-full h-auto rounded-xl"
            />
        </a>
    )
}