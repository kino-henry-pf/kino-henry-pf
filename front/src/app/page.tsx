import MovieCard from "@/components/MovieCard";
import HeroCarrousel from "./HeroCarrousel";
import Footer from "@/components/Footer";
import { useApi } from "@/hooks/api";

export default async function Home() {
	const api = useApi(),
		movies = (await api.get<any[]>("movies")).map(m => ({...m, synopsis: m.sinopsis}))

	return (
		<>
			<main>
				<section className="py-10">
					<HeroCarrousel movies={movies} />
				</section>
				<section className="py-10 container-x-padding">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-10">
						{
							movies.map(movie => (
								<MovieCard
									key={movie.id}
									movie={movie}
								/>
							))
						}
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}