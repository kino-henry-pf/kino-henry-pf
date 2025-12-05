export const dynamic = "force-dynamic";

import MovieCard from "@/components/MovieCard";
import HeroCarrousel from "./HeroCarrousel";
import Footer from "@/components/Footer";
import { apiClient } from "@/services/apiClient";
import { Movie } from "@/types/movie";

export default async function Home() {
	const api = apiClient(),
		movies = await api.get<Movie[]>("movies", {
			disableCache: true
		})

	return (
		<>
			<main>
				<section className="pb-10">
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