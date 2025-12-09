export default function validateBranchUpsert(values?: {
    name?: string,
    address?: string,
    latitude?: number,
    longitude?: number
}) {
    if (!values) return

    const errors: Partial<Omit<typeof values, "latitude" | "longitude">> & {notFound?: string, latitude?: string, longitude?: string} = {}

    if (values.name && values.name.length > 150) {
        errors.name = "Debe contener menos de 150 caracteres"
    } else if (!values.name) {
        errors.notFound = "name"
    }

    if (values.address && values.address.length > 255) {
        errors.address = "Debe contener menos de 255 caracteres"
    } else if (!values.address) {
        errors.notFound = "address"
    }

    if (values.latitude && isNaN(values.latitude)) {
        errors.latitude = "Debe ser un número decimal válido"
    } else if (!values.latitude) {
        errors.notFound = "latitude"
    }

    if (values.longitude && isNaN(values.longitude)) {
        console.log(values.longitude)
        errors.longitude = "Debe ser un número decimal válido"
    } else if (!values.longitude) {
        errors.notFound = "longitude"
    }

    console.log(errors.notFound)

    return errors
}