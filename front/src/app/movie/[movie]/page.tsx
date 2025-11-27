import MovieData from "@/components/MovieData";
import { useApi } from "@/hooks/api";
import { Movie } from "@/types/movie";
import { redirect } from "next/navigation";

export default async function MoviePage({
    params
}: {
    params: Promise<{
        movie: string
    }>
}) {
    try {
        const api = useApi(),
            movie = await api.get<Movie>(`movies/${(await params).movie}`)

        return (
            <main>
                <section className="py-10 container-x-padding h-[550px]">
                    <MovieData
                        movie={movie}
                    />
                </section>
            </main>
        )
    } catch (error) {
        console.error(error)
        redirect("/")
    }
}