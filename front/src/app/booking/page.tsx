import Button from "@/components/Button";
import Footer from "@/components/Footer";
import MovieSelector from "@/components/MovieSelector";
import { useApi } from "@/hooks/api";
import { Movie } from "@/types/movie";
import * as Icon from "akar-icons"

export default async function BookingPage() {
    const api = useApi(),
        movies = await api.get<Movie[]>("movies")

    return (
        <>
            <section className="pt-10 flex flex-col items-center gap-10">
                <div className="w-fit h-fit flex flex-col gap-20">
                    <div className="container-x-padding w-[900px] max-w-full h-fit flex flex-col gap-2">
                        <h1 className="text-md font-bold text-center">&iquest;Qué películas vas a ver?</h1>
                        <p className="text-3xl font-bold text-center">Elige las películas que quieres ver</p>
                    </div>
                    <div className="container-x-padding w-[900px] max-w-full grid lg:grid-cols-4 grid-cols-2 h-fit gap-8 lg:gap-7">
                        {
                            movies.map(movie => (
                                <MovieSelector
                                    key={movie.id}
                                    movie={movie}
                                />
                            ))
                        }
                    </div>
                </div>
                <nav className="w-full h-20 sticky bottom-0 left-0 bg-black/90 backdrop-blur-sm flex items-center justify-end gap-10 container-x-padding">
                    <span className="text-md font-semibold">Total: $10.000,00</span>
                    <Button rounded>
                        <span>Siguiente</span>
                        <Icon.ArrowRight className="size-4" strokeWidth={3} />
                    </Button>
                </nav>
            </section>
            <Footer />
        </>
    )
}