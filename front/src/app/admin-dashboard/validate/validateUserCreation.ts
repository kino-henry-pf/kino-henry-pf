export default function validateUserCreation(values?: {
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

    if (values.password) {
        if (values.password.length > 20) {
            errors.password = "It must contain fewer than 20 characters"
        } else if (values.password.length < 8) {
            errors.password = "It must contain more than 8 characters"
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(values.password)
        ) {
            errors.password = "It must contain at least: one lowercase letter, one uppercase letter, one number, and one special character."
        }
    } else {
        errors.notFound = "password"
    }

    if (values.confirmPassword && values.confirmPassword !== values.password) {
        errors.confirmPassword = "The password does not match."
    } else if (!values.confirmPassword) {
        errors.notFound = "confirmPassword"
    }

    return errors
}