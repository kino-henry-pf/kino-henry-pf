import { Movie } from "@/types/movie"
import Rating from "./Rating"
import Image from "next/image"
import Button from "./Button"

export default function MovieData({movie}: {
    movie: Movie
}) {
    return (
        <article className="w-[800px] max-w-screen h-full items-center grid grid-cols-[auto_1fr] gap-15 grid-rows-1">
            <Image
                width={348}
                height={570}
                alt={movie.title}
                src={movie.image}
                className="h-full w-auto rounded-2xl"
            />
            <div className="w-full h-fit flex flex-col gap-5">
                <h2 className="text-5xl font-bold">{movie.title}</h2>
                <div className="flex items-center gap-2 font-bold">
                    <Rating value={movie.rating} />
                    <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
                    <span>Disponible ahora!</span>
                </div>
                <p>{movie.synopsis}</p>
                <nav className="w-fit flex items-center gap-4">
                    <Button rounded>Cotizar boleto</Button>
                    <Button primary={false} rounded>Ver opiniones</Button>
                </nav>
            </div>
        </article>
    )
}