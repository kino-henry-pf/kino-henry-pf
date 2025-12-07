"use client"

import UpsertResourcePage from "../../templates/UpsertResourcePage";
import { Product } from "@/types/product";
import validateProductCreation from "../../validate/validateProductCreation";

export default function CreateProductPage() {
    return (
        <UpsertResourcePage<Product>
            type="POST"
            resource="products"
            title="Crear un nuevo producto"
            submitText="Crear producto"
            successMessage="Se ha creado el producto"
            successRedirect={() => "/admin-dashboard/products"}
            validate={validateProductCreation}
            mapError={() => {
                return {
                    title: "Error desconocido",
                    description: "Se desconoce la causa del error, contacte con el soporte"
                }
            }}
            fields={[
                {
                    name: "image",
                    label: "Imagen",
                    icon: "Image",
                    required: true,
                    as: "file",
                    type: "file",
                },
                {
                    name: "name",
                    label: "Nombre",
                    icon: "WineGlass",
                    required: true,
                    autoFocus: true
                },
                {
                    name: "description",
                    label: "Descripción",
                    icon: "Pencil",
                    as: "textarea",
                    required: true,
                    type: "textarea"
                },
                {
                    name: "price",
                    label: "Precio",
                    icon: "Coin",
                    required: true,
                },
                {
                    name: "category",
                    label: "Categoría",
                    icon: "ShippingBoxV2",
                    required: true,
                    as: "select",
                    options: [
                        {
                            label: "Pochoclo",
                            value: "popcorn"
                        },
                        {
                            label: "Gaseosas",
                            value: "soft_drink"
                        },
                        {
                            label: "Agua",
                            value: "water"
                        },
                        {
                            label: "Jugo",
                            value: "juice"
                        },
                        {
                            label: "Golosinas",
                            value: "candy"
                        },
                        {
                            label: "chocolate",
                            value: "Chocolates"
                        },
                        {
                            label: "Chicles",
                            value: "gum"
                        },
                        {
                            label: "Nachos",
                            value: "nachos"
                        },
                        {
                            label: "Perros calientes",
                            value: "hotdog"
                        },
                        {
                            label: "Combinaciones",
                            value: "combo"
                        },
                        {
                            label: "Otro",
                            value: "other"
                        },
                    ]
                }
            ]}
        />
    )
}