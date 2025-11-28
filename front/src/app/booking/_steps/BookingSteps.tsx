"use client"

import Button from "@/components/Button"
import { Movie } from "@/types/movie"
import * as Icon from "akar-icons"
import SelectMoviesStep from "./SelectMovies"
import { useState } from "react"
import { SelectedMovieState } from "./types"

export default function BookingSteps({
    movies
}: {
    movies: Movie[]
}) {
    const [_selectedMovies, _setSelectedMovies] = useState<SelectedMovieState[]>([])

    return (
        <section className="pt-10 flex flex-col items-center gap-10">
            <div className="w-fit h-fit flex flex-col gap-20">
                <SelectMoviesStep
                    movies={movies}
                    onChange={_setSelectedMovies}
                />
            </div>
            <nav
                className={[
                    "w-full h-20 sticky bottom-0 left-0 bg-black/90 backdrop-blur-sm flex items-center justify-end gap-10 container-x-padding transition-[max-height,opacity] duration-500 overflow-hidden",
                    _selectedMovies.length > 0 ? "max-h-[5rem]" : "max-h-0 opacity-0"
                ].join(" ")}
            >
                <span className="text-sm font-semibold opacity-65">$10.000,00</span>
                <Button rounded>
                    <span>Siguiente</span>
                    <Icon.ArrowRight className="size-4" strokeWidth={3} />
                </Button>
            </nav>
        </section>
    )
}