export default function validateMovieUpdate(values?: {
    title?: string,
    rating?: string,
    synopsis?: string,
    genre?: string,
    duration?: string,
    image?: File
}) {
    if (!values) return

    const errors: Partial<Omit<typeof values, "image">> & {notFound?: string, image?: string} = {}

    if (values.image && values.image.size > 5 * 1024 * 1024) {
        errors.image = "It must weigh less than 5MB"
    }

    if (!values.title) {
        errors.notFound = "title"
    } else if (values.title.length > 100) {
        errors.title = "It must contain fewer than 100 characters"
    }

    if (values.rating && !/^(?:[0-4](?:\.[0-9])?|5(?:\.0)?)$/.test(values.rating)) {
        errors.rating = "It contains only one decimal place and must be between 0 and 5."
    }

    if (!values.genre) {
        errors.notFound = "genre"
    }

    if (values.duration === "" || values.duration === undefined) {
        errors.notFound = "duration"
    } else if (!/^(?:([1-9])|([1-9][0-9])|([1-4][0-9]{2})|(500))$/.test(values.duration)) {
        errors.duration = "It must be a number between 1 and 500"
    }

    return errors
}