import { Movie } from "@/types/movie"
import Image from "next/image"

export default function HeroCarrousel({
    movies
}: {
    movies: Movie[]
}) {
    return (
            <div className={`overflow-x-auto snap-x snap-mandatory flex flex-row gap-10 px-10 scroll-p-0 hide-scrollbar`}>
                {
                    movies.map(movie => (
                        <div key={movie.id} className="w-screen h-fit">
                            <div className="snap-center shrink-0 w-screen flex items-center justify-center max-w-full h-fit">
                                <div className="w-[1300px] h-[560px] max-w-[calc(100vw-50px)] bg-black overflow-hidden rounded-4xl">
                                    <Image
                                        alt={movie.title}
                                        src={movie.image}
                                        width={100}
                                        height={200}
                                        className="w-full h-full object-cover blur-[10vh]"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
    )
}