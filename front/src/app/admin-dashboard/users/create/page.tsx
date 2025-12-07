"use client"

import { User } from "@/types/user";
import UpsertResourcePage from "../../templates/UpsertResourcePage";
import validateUserCreation from "../../validate/validateUserCreation";

export default function CreateUserPage() {
    return (
        <UpsertResourcePage<User>
            type="POST"
            resource="auth/register"
            title="Crear un nuevo usuario"
            submitText="Crear usuario"
            successMessage="Se ha creado el usuario"
            validate={validateUserCreation}
            successRedirect={() => "/admin-dashboard/users"}
            backLink="/admin-dashboard/users"
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
                    placeholder: "Ej: Lindo Aramsito",
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
                },
                {
                    name: "password",
                    label: "Contraseña",
                    icon: "Key",
                    type: "password",
                    required: true
                },
                {
                    name: "confirmPassword",
                    label: "Repita la contraseña",
                    icon: "Key",
                    type: "password",
                    required: true
                }
            ]}
        />
    )
}