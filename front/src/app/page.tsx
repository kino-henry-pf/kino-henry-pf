import HeroCarrousel from "./HeroCarrousel";
import movies from "@/../public/movies.json"

export default async function Home() {
	return (
		<main>
			<section className="py-10">
				<HeroCarrousel movies={movies} />
			</section>
		</main>
	)
}