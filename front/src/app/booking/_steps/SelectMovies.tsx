"use client"

import MovieSelector from "@/components/MovieSelector"
import { Movie } from "@/types/movie"
import { SelectedMovieState } from "./types"
import { useCallback, useEffect, useState } from "react"

export default function SelectMoviesStep({
    movies,
    onChange
}: {
    movies: Movie[],
    onChange: (selected: SelectedMovieState[]) => any
}) {
    const [_selected, _setSelected] = useState<SelectedMovieState[]>([])

    const handleSelect = useCallback((movie: Movie, quantity: number) => {
        _setSelected(prevSelected => {
            if (quantity === 0) {
                return prevSelected.filter(selected => selected.movie.id !== movie.id)
            }

            const matchSelected = prevSelected.find(selected => movie.id === selected.movie.id)

            if (matchSelected) {
                matchSelected.quantity = quantity
                return [
                    ...prevSelected.filter(selected =>
                            selected.movie.id !== matchSelected.movie.id
                    ),
                    {
                        movie,
                        quantity
                    }
                ]
            } else {
                return [
                    ...prevSelected,
                    {
                        quantity,
                        movie
                    }
                ]
            }
        })
    }, [])

    useEffect(() => {
        onChange(_selected)
    }, [_selected])
    
    return (
        <>
            <div className="container-x-padding w-[900px] max-w-full h-fit flex flex-col gap-2">
                <h1 className="text-md font-bold text-center">&iquest;Qué películas vas a ver?</h1>
                <p className="text-3xl font-bold text-center">Elige las películas que quieres ver</p>
            </div>
            <div className="container-x-padding w-[900px] max-w-full grid lg:grid-cols-4 grid-cols-2 h-fit gap-8 lg:gap-7">
                {
                    movies.map(movie => (
                        <MovieSelector
                            onSelect={quantity => handleSelect(movie, quantity)}
                            key={movie.id}
                            movie={movie}
                        />
                    ))
                }
            </div>
        </>
    )
}