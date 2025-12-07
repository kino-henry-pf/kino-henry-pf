export default function validateProductUpdate(values?: {
    name?: string,
    price?: string,
    description?: string,
    image?: File,
    category?: string
}) {
    if (!values) return

    const errors: Partial<Omit<typeof values, "image">> & {notFound?: string, image?: string} = {}

    if (values.image && values.image.size > 5 * 1024 * 1024) {
        errors.image = "Debe pesar menos de 5MB"
    }

    if (!values.name) {
        errors.notFound = "name"
    } else if (values.name.length > 100) {
        errors.name = "Debe contener menos de 100 caracteres"
    }

    if (!values.description) {
        errors.notFound = "description"
    } else if (values.description.length > 200) {
        errors.name = "Debe contener menos de 200 caracteres"
    }

    if (values.price === "" || values.price === undefined) {
        errors.notFound = "price"
    } else if (parseFloat(values.price.replace(".", "").replace(",", ".")) <= 0) {
        errors.price = "Debe ser un número decimal mayor a 0 separando decimales con coma"
    }

    if (values.category === "" || values.category === undefined) {
        errors.notFound = "category"
    }

    return errors
}