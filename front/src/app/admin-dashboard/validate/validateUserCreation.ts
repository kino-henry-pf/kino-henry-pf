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

    if (values.password) {
        if (values.password.length > 20) {
            errors.password = "Debe contener menos de 20 caracteres"
        } else if (values.password.length < 8) {
            errors.password = "Debe contener más de 8 caracteres"
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(values.password)
        ) {
            errors.password = "Debe contener al menos: una letra minúscula, una letra mayúscula, un numero y un caracter especial"
        }
    } else {
        errors.notFound = "password"
    }

    if (values.confirmPassword && values.confirmPassword !== values.password) {
        errors.confirmPassword = "No coincide con la contraseña"
    } else if (!values.confirmPassword) {
        errors.notFound = "confirmPassword"
    }

    return errors
}