import { Movie } from "@/types/movie"
import Rating from "./Rating"
import Image from "next/image"
import Button from "./Button"
import { Fragment } from "react/jsx-runtime"

export default function MovieData({
    movie,
    actions
}: {
    movie: Movie,
    actions?: React.ReactNode[]
}) {
    return (
        <article className="max-w-full w-full lg:w-[800px] h-full items-center lg:grid lg:grid-cols-[auto_1fr] gap-15 lg:grid-rows-1 grid-cols-1">
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
                    <span>Disponible ahora!</span>
                </div>
                <p>{movie.synopsis}</p>
                <nav className="w-fit flex items-center gap-4">
                    <Button rounded>Cotizar boleto</Button>
                    {
                        actions && actions.map((action, index) => (
                            <Fragment key={index}>
                                {action}
                            </Fragment>
                        ))
                    }
                </nav>
            </div>
        </article>
    )
}