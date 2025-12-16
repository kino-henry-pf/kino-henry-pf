import MovieData from "@/components/MovieData"
import OpinionCard from "@/components/OpinionCard"
import { apiClient } from "@/services/apiClient"
import { Movie } from "@/types/movie"
import { redirect } from "next/navigation"
import RateMovieButton from "./components/RateMovieButton"
import { Review } from "@/types/review"

export default async function MoviePage({
	params,
}: {
	params: Promise<{
		movie: string
	}>
}) {
	try {
		const { movie } = await params

		const api = apiClient()

		const movieData = await api.get<Movie>(`movies/${movie}`, {
			disableCache: true
		})

		const reviews = await api.get<Review[]>(`reviews/${movieData.id}`, {
			disableCache: true
		})

		return (
			<main>
				<section className="py-10 container-x-padding h-[550px]">
					<MovieData
						movie={movieData}
					/>
				</section>
				<section className="py-10 container-x-padding flex flex-col gap-10">
					<div className="flex items-center justify-between gap-5">
						{
							reviews.length > 0 ? (
								<h2 className="text-xl font-bold">Opinions</h2>
							) : (
								<span className="text-xl">There are no opinions yet</span>
							)
						}
						<RateMovieButton movie={movieData} />
					</div>
					<div className="w-full h-fit flex flex-col gap-5">
						{
							reviews.map(review => (
								<OpinionCard
									key={review.id}
									review={review}
								/>
							))
						}
					</div>
				</section>
			</main>
		)
	} catch (error) {
		redirect("/")
	}
}
