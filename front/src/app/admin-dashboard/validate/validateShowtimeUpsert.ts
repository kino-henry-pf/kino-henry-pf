export default function validateShowtimeUpsert(values: {
    movieId?: string,
    branchId?: string,
    roomId?: string,
    startTime?: string,
    language?: string,
    format?: string
}) {
    const errors: Partial<typeof values> & {notFound?: string} = {}

    if (!values.movieId) {
        errors.notFound = "movieId"
    }

    if (!values.branchId) {
        errors.notFound = "branchId"
    }

    if (!values.roomId) {
        errors.notFound = "roomId"
    }

    if (!values.startTime) {
        errors.notFound = "startTime"
    }

    if (!values.language) {
        errors.notFound = "language"
    }

    if (!values.format) {
        errors.notFound = "format"
    }

    return errors
}