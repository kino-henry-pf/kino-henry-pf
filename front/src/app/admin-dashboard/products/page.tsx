"use client"

import { Product } from "@/types/product";
import ResourcePage from "../templates/ResourcePage";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {
    return <ResourcePage<Product>
        title="Productos"
        resource="products"
        head={["Imagen", "Nombre", "Categoría", "Precio"]}
        mapRow={product => ({
            resourceId: product.id,
            value: [
                <Link href={`/admin-dashboard/products/${product.id}`}>
                    <Image
                        width={100}
                        height={100}
                        alt={product.name}
                        src={product.image}
                    />
                </Link>,
                <Link href={`/admin-dashboard/products/${product.id}`}>
                    {product.name}
                </Link>,
                product.category,
                parseFloat(product.price).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })
            ]
        })}
    />
}