import { Movie } from "@/types/movie"

export default function HeroCarrousel({
    movies
}: {
    movies: Movie[]
}) {
    return (
        <div className="relative max-w-[1300px] mx-auto">
            <div className="overflow-x-auto snap-x snap-mandatory flex gap-10 px-10 scroll-p-0 hide-scrollbar">
                <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-blue-500 rounded-4xl"></div>
                <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-green-500 rounded-4xl"></div>
                <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-purple-500 rounded-4xl"></div>
                <div className="snap-center shrink-0 w-[1300px] max-w-full h-[560px] bg-orange-500 rounded-4xl"></div>
            </div>
            <div className="
            absolute w-full h-full top-0 left-0
            pointer-events-none
            bg-[linear-gradient(90deg,_var(--background)_2%,_transparent_7%,_transparent_93%,_var(--background)_98%)]
            "></div>
        </div>
    )
}