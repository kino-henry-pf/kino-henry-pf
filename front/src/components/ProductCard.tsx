import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "akar-icons"

export default function ProductCard({
    product
}: {
    product: Product
}) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="w-full min-h-[200px] h-full bg-white/5 cursor-pointer grid grid-cols-[2fr_3fr] grid-rows-1 overflow-hidden border-1 border-[var(--color-border)] group"
        >
            <div className="w-full h-full relative">
                <Image
                    fill
                    alt={product.name}
                    src={product.image}
                    className="object-contain bg-[#f2f2f2]"
                />
            </div>
            <div className="w-full h-full flex flex-col gap-2 p-5 relative">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p className="mt-auto">{
                    parseFloat(product.price).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS"
                    })
                }</p>
                <Icon.ArrowRight className="size-4 absolute bottom-5 right-5 -translate-x-4 opacity-0 transition-[transform,translate,opacity] group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
        </Link>
    )
}