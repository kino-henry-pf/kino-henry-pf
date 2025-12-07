export default function validateUserUpdate(values?: {
    name?: string,
    email?: string,
    address?: string,
    password?: string,
    confirmPassword?: string
}) {
    if (!values) return

    const errors: Partial<typeof values> & {notFound?: string} = {}

    if (values.name) {
        if (values.name.length > 50) {
            errors.name = "Debe contener menos de 50 caracteres"
        } else if (values.name.length < 3) {
            errors.name = "Debe contener más de 3 caracteres"
        }
    } else {
        errors.notFound = "name"
    }

    if (
        values.email
        && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
        errors.email = "Ingrese un correo válido"
    } else if (!values.email) {
        errors.notFound = "email"
    }

    if (
        values.address
    ) {
        if (values.address.length > 100) {
            errors.address = "Debe contener menos de 100 caracteres"
        } else if (values.address.length < 3) {
            errors.address = "Debe contener al menos 3 caracteres"
        }
    }

    return errors
}