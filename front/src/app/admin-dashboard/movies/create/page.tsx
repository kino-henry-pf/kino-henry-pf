"use client"

import { Movie } from "@/types/movie";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateMovieCreation from "../../validate/validateMovieCreation";

export default function CreateMoviePage() {
    return (
        <UpsertResourcePage<Movie>
            type="POST"
            resource="movies"
            title="Crear una nueva película"
            submitText="Crear película"
            successMessage="Se ha creado la película"
            validate={validateMovieCreation}
            successRedirect={() => "/admin-dashboard/movies"}
            backLink="/admin-dashboard/movies"
            mapError={() => {
                return {
                    title: "Error desconocido",
                    description: "Se desconoce la causa del error, contacte con el soporte"
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
                    label: "Título",
                    icon: "Heart",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "synopsis",
                    label: "Sinopsis",
                    icon: "Pencil",
                    as: "textarea",
                    required: true,
                    type: "textarea"
                },
                {
                    name: "genre",
                    label: "Género",
                    icon: "DoubleSword",
                    as: "select",
                    required: true,
                    options: [
                        {
                            value: "action",
                            label: "Acción"
                        },
                        {
                            value: "adventure",
                            label: "Aventura"
                        },
                        {
                            value: "animation",
                            label: "Animación"
                        },
                        {
                            value: "comedy",
                            label: "Comedia"
                        },
                        {
                            value: "crime",
                            label: "Crimen"
                        },
                        {
                            value: "drama",
                            label: "Drama"
                        },
                        {
                            value: "fantasy",
                            label: "Fantasía"
                        },
                        {
                            value: "horror",
                            label: "Horror"
                        },
                        {
                            value: "mistery",
                            label: "Misterio"
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
                            label: "Documental"
                        },
                        {
                            value: "musical",
                            label: "Musical"
                        },
                        {
                            value: "war",
                            label: "Guerra"
                        },
                        {
                            value: "western",
                            label: "Lejano oeste"
                        },
                        {
                            value: "historical",
                            label: "Historico"
                        },
                        {
                            value: "sports",
                            label: "Deportes"
                        }
                    ]
                },
                {
                    name: "rating",
                    label: "Calificación inicial",
                    icon: "Star",
                    required: true,
                    type: "number"
                },
                {
                    name: "duration",
                    label: "Duración en minutos",
                    icon: "Clock",
                    required: true,
                    type: "number"
                }
            ]}
        />
    )
}