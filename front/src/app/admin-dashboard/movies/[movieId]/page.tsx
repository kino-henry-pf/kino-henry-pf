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
            title: "Do you want to delete this movie?",
            description: movie => `The film will be removed "${movie.title}"`,
            successRedirect: "/admin-dashboard/movies"
        }}
        mapData={movie => ({
            title: "Movie: " + movie.title,
            image: movie.image,
            rows: [
                {
                    name: "UUID",
                    value: movie.id
                },
                {
                    name: "Títle",
                    value: movie.title
                },
                {
                    name: "Synopsis",
                    value: movie.synopsis
                },
                {
                    name: "Genre",
                    value: movie.genre
                },
                {
                    name: "Qualification",
                    value: movie.rating
                }
            ]
        })}
    />
}