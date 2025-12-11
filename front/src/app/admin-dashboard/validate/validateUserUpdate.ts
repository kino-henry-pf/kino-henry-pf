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
            errors.name = "It must contain fewer than 50 characters"
        } else if (values.name.length < 3) {
            errors.name = "It must contain more than 3 characters"
        }
    } else {
        errors.notFound = "name"
    }

    if (
        values.email
        && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
        errors.email = "Enter a valid email address"
    } else if (!values.email) {
        errors.notFound = "email"
    }

    if (
        values.address
    ) {
        if (values.address.length > 100) {
            errors.address = "It must contain fewer than 100 characters"
        } else if (values.address.length < 3) {
            errors.address = "It must contain at least 3 characters"
        }
    }

    return errors
}