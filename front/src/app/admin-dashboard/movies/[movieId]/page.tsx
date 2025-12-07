"use client"

import SingleResourcePage from "../../templates/SingleResourcePage"
import { useParams } from "next/navigation"
import { Movie } from "@/types/movie"

export default function AdminMoviePage() {
    const params = useParams()

    return <SingleResourcePage<Movie>
        resource={`movies/${params.movieId}`}
        editLink={`/admin-dashboard/movies/${params.movieId}/edit`}
        backLink="/admin-dashboard/movies"
        deleteResource={{
            path: `movies/${params.movieId}`,
            title: "¿Desea eliminar esta película?",
            description: movie => `Se eliminará la película "${movie.title}"`,
            successRedirect: "/admin-dashboard/movies"
        }}
        mapData={movie => ({
            title: "Película: " + movie.title,
            image: movie.image,
            rows: [
                {
                    name: "UUID",
                    value: movie.id
                },
                {
                    name: "Título",
                    value: movie.title
                },
                {
                    name: "Sinopsis",
                    value: movie.synopsis
                },
                {
                    name: "Género",
                    value: movie.genre
                },
                {
                    name: "Calificación",
                    value: movie.rating
                }
            ]
        })}
    />
}