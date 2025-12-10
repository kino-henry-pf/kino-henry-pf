"use client"

import { User } from "@/types/user";
import UpsertResourcePage from "../../../templates/UpsertResourcePage";
import { useParams } from "next/navigation";
import validateUserUpdate from "@/app/admin-dashboard/validate/validateUserUpdate";

export default function UpdateUserPage() {
    const params = useParams()

    return (
        <UpsertResourcePage<User>
            type="PATCH"
            resource={`users/${params.userId}`}
            getterResource={`users/${params.userId}`}
            title="Modifica un usuario"
            submitText="Actualizar usuario"
            successMessage="Se ha actualizado el usuario"
            validate={validateUserUpdate}
            successRedirect={user => `/admin-dashboard/users/${user?.id}`}
            backLink={`/admin-dashboard/users/${params.userId}`}
            mapError={error => {
                if (error && error["statusCode"] && error["statusCode"] === 409) {
                    return {
                        title: "Correo en uso",
                        description: "La dirección de correo electrónico proporcionada ya está en uso"
                    }
                }

                return {
                    title: "Error desconocido",
                    description: "Se desconoce la causa del error, contacte con el soporte"
                }
            }}
            fields={[
                {
                    name: "name",
                    label: "Nombre",
                    icon: "Person",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "email",
                    label: "Correo electrónico",
                    icon: "Mention",
                    required: true
                },
                {
                    name: "address",
                    label: "Dirección",
                    icon: "CheckIn"
                }
            ]}
        />
    )
}