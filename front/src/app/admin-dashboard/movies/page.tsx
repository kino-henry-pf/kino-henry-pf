"use client"

import { Movie } from "@/types/movie";
import AdminResourcePage from "../_resources/AdminResourcePage";
import Image from "next/image";
import Link from "next/link";

export default function AdminMoviesPage() {
    return <AdminResourcePage<Movie>
        title="Películas"
        resource="movies"
        head={["Imagen", "Título", "Calificación"]}
        mapRow={movie => ({
            resourceId: movie.id,
            value: [
                <Link href={`/admin-dashboard/movies/${movie.id}`}>
                    <Image
                        width={100}
                        height={100}
                        alt={movie.title}
                        src={movie.image}
                    />
                </Link>,
                <Link href={`/admin-dashboard/movies/${movie.id}`}>
                    {movie.title}
                </Link>,
                movie.rating
            ]
        })}
    />
}