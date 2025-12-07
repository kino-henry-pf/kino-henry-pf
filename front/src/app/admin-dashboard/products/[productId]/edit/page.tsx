"use client"

import UpsertResourcePage from "../../../templates/UpsertResourcePage";
import { Product } from "@/types/product";
import validateProductUpdate from "@/app/admin-dashboard/validate/validateProductUpdate";
import { useParams } from "next/navigation";

export default function CreateProductPage() {
    const params = useParams()

    return (
        <UpsertResourcePage<Product>
            type="PATCH"
            resource={`products/${params.productId}`}
            getterResource={`products/${params.productId}`}
            title="Modificar producto"
            submitText="Modificar producto"
            successMessage="Se ha actualizado el producto"
            validate={validateProductUpdate}
            mapPreview={data => data.image}
            successRedirect={product => `/admin-dashboard/products/${product?.id}`}
            backLink={`/admin-dashboard/products/${params.productId}`}
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