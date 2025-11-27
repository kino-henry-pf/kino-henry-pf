import MovieData from "@/components/MovieData";
import { useApi } from "@/hooks/api";
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
            movieD = await api.get<any>(`movies/${(await params).movie}`),
            movie = {...movieD, synopsis: movieD.sinopsis}

        return (
            <main>
                <section className="py-10 container-x-padding h-[550px]">
                    <MovieData
                        movie={movie}
                    />
                </section>
            </main>
        )
    } catch {
        redirect("/")
    }
}