import Button from "@/components/Button";
import Footer from "@/components/Footer";
import MovieSelector from "@/components/MovieSelector";
import { useApi } from "@/hooks/api";
import { Movie } from "@/types/movie";
import * as Icon from "akar-icons"
import BookingSteps from "./_steps/BookingSteps";

export default async function BookingPage() {
    const api = useApi(),
        movies = await api.get<Movie[]>("movies")

    return (
        <>
            <BookingSteps movies={movies} />
            <Footer />
        </>
    )
}