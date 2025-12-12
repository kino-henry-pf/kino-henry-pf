export default function validateRoomUpsert(values?: {
    name?: string,
    branchId?: string
}) {
    if (!values) return

    const errors: Partial<typeof values> & {notFound?: string} = {}

    if (values.name && values.name.length > 150) {
        errors.name = "It must contain less than 150 characters"
    } else if (!values.name) {
        errors.notFound = "name"
    }

    if (!values.branchId) {
        errors.notFound = "branchId"
    }

    return errors
}