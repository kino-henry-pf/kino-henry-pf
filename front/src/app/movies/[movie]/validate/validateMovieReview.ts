export default function validateMovieReview(values: {
    rating: number,
    review: string
}) {
    const errors: Partial<Omit<typeof values, "rating">> & {notFound?: string, rating?: string} = {}

    if (values.review.length > 200) {
        errors.review = "Debe contener menos de 200 caracteres"
    } else if (!values.review || values.review.trim().length === 0) {
        errors.notFound = "review"
    }

    return errors
}