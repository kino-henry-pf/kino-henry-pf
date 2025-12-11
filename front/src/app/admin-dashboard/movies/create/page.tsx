"use client"

import { Movie } from "@/types/movie";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateMovieCreation from "../../validate/validateMovieCreation";

export default function CreateMoviePage() {
    return (
        <UpsertResourcePage<Movie>
            type="POST"
            resource="movies"
            title="Create a new movie"
            submitText="Create movie"
            successMessage="The film has been created"
            validate={validateMovieCreation}
            successRedirect={() => "/admin-dashboard/movies"}
            backLink="/admin-dashboard/movies"
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
                            label: "Action"
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
                            label: "War"
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