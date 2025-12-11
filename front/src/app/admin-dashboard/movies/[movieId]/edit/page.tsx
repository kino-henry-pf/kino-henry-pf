"use client"

import UpsertResourcePage from "@/app/admin-dashboard/templates/UpsertResourcePage";
import validateMovieUpdate from "@/app/admin-dashboard/validate/validateMovieUpdate";
import { Movie } from "@/types/movie";
import { useParams } from "next/navigation";

export default function UpdateMoviePage() {
    const params = useParams()

    return (
        <UpsertResourcePage<Movie>
            type="PATCH"
            resource={`movies/${params.movieId}`}
            getterResource={`movies/${params.movieId}`}
            title="Modify movie"
            submitText="Apply changes"
            successMessage="The film has been modified"
            validate={validateMovieUpdate}
            mapPreview={data => data.image}
            successRedirect={movie => `/admin-dashboard/movies/${movie?.id}`}
            backLink={`/admin-dashboard/movies/${params.movieId}`}
            mapError={() => {
                return {
                    title: "Unknown error",
                    description: "The cause of the error is unknown, please contact support"
                }
            }}
            fields={[
                {
                    name: "image",
                    label: "Poster",
                    icon: "Image",
                    required: true,
                    as: "file",
                    type: "file",
                },
                {
                    name: "title",
                    label: "Títle",
                    icon: "Heart",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "synopsis",
                    label: "Synopsis",
                    icon: "Pencil",
                    as: "textarea",
                    required: true,
                    type: "textarea"
                },
                {
                    name: "genre",
                    label: "Genre",
                    icon: "DoubleSword",
                    as: "select",
                    required: true,
                    options: [
                        {
                            value: "action",
                            label: "Actión"
                        },
                        {
                            value: "adventure",
                            label: "Adventure"
                        },
                        {
                            value: "animation",
                            label: "Animatión"
                        },
                        {
                            value: "comedy",
                            label: "Comedy"
                        },
                        {
                            value: "crime",
                            label: "Crime"
                        },
                        {
                            value: "drama",
                            label: "Drama"
                        },
                        {
                            value: "fantasy",
                            label: "Fantasy"
                        },
                        {
                            value: "horror",
                            label: "Horror"
                        },
                        {
                            value: "mistery",
                            label: "Mistery"
                        },
                        {
                            value: "romance",
                            label: "Romance"
                        },
                        {
                            value: "sci_fi",
                            label: "Sci-Fi"
                        },
                        {
                            value: "thriller",
                            label: "Thriller"
                        },
                        {
                            value: "documentary",
                            label: "Documentary"
                        },
                        {
                            value: "musical",
                            label: "Musical"
                        },
                        {
                            value: "war",
                            label: "war"
                        },
                        {
                            value: "western",
                            label: "Western"
                        },
                        {
                            value: "historical",
                            label: "Historical"
                        },
                        {
                            value: "sports",
                            label: "Sports"
                        }
                    ]
                },
                {
                    name: "rating",
                    label: "Initial qualification",
                    icon: "Star",
                    required: true,
                    type: "number"
                },
                {
                    name: "duration",
                    label: "Duration in minutes",
                    icon: "Clock",
                    required: true,
                    type: "number"
                }
            ]}
        />
    )
}