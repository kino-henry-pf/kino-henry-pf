export default function validateProductCreation(values?: {
    name?: string,
    price?: string,
    description?: string,
    image?: File,
    category?: string
}) {
    if (!values) return

    const errors: Partial<Omit<typeof values, "image">> & {notFound?: string, image?: string} = {}

    if (!values.image) {
        errors.notFound = "image"
    } else if (values.image.size > 5 * 1024 * 1024) {
        errors.image = "It must weigh less than 5MB"
    }

    if (!values.name) {
        errors.notFound = "name"
    } else if (values.name.length > 100) {
        errors.name = "It must contain fewer than 100 characters"
    }

    if (!values.description) {
        errors.notFound = "description"
    } else if (values.description.length > 200) {
        errors.name = "It must contain fewer than 200 characters"
    }

    if (values.price === "" || values.price === undefined) {
        errors.notFound = "price"
    } else if (parseFloat(values.price.replace(".", "").replace(",", ".")) <= 0) {
        errors.price = "It must be a decimal number greater than 0, separating decimals with a comma."
    }

    if (values.category === "" || values.category === undefined) {
        errors.notFound = "category"
    }

    return errors
}