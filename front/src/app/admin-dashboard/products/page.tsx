"use client"

import { Product } from "@/types/product";
import AdminResourcePage from "../_resources/AdminResourcePage";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {
    return <AdminResourcePage<Product>
        title="Películas"
        resource="products"
        head={["Imagen", "Nombre", "Precio"]}
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
                parseFloat(product.price).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })
            ]
        })}
    />
}