import Footer from "@/components/Footer";
import MovieData from "@/components/MovieData";
import OpinionCard from "@/components/OpinionCard";
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
            movie = await api.get<Movie>(`movies/${(await params).movie}`, {
                disableCache: true
            })

        return (
            <>
                <main>
                    <section className="py-10 container-x-padding h-[550px]">
                        <MovieData
                            movie={movie}
                        />
                    </section>
                    <section className="py-10 container-x-padding flex flex-col gap-10">
                        <h2 className="text-xl font-bold">Opiniones</h2>
                        <div className="w-full h-fit flex flex-col gap-5">
                            <OpinionCard />
                            <OpinionCard />
                            <OpinionCard />
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        )
    } catch (error) {
        redirect("/")
    }
}