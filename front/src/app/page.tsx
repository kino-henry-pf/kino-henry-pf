import MovieCard from "@/components/MovieCard";
import HeroCarrousel from "./HeroCarrousel";
import movies from "@/../public/movies.json"
import Footer from "@/components/Footer";

export default async function Home() {
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