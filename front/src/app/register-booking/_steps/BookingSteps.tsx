"use client"

import Button from "@/components/Button"
import * as Icon from "akar-icons"
import { useState } from "react"
import { SelectedProductState } from "./types"
import SelectProductsStep from "./SelectProducts"
import { Product } from "@/types/product"

export default function BookingSteps({
    products
}: {
    products: Product[]
}) {
    const [_selectedProducts, _setSelectedProducts] = useState<SelectedProductState[]>([])

    return (
        <section className="pt-10 flex flex-col items-center gap-10">
            <div className="w-fit h-fit flex flex-col gap-10">
                <SelectProductsStep
                    products={products}
                    onChange={_setSelectedProducts}
                />
            </div>
            <nav
                className={[
                    "w-full h-20 sticky bottom-0 left-0 bg-black/90 backdrop-blur-sm flex items-center justify-end gap-10 container-x-padding transition-[max-height,opacity] duration-500 overflow-hidden",
                    _selectedProducts.length > 0 ? "max-h-[5rem]" : "max-h-0 opacity-0"
                ].join(" ")}
            >
                <span className="text-sm font-semibold opacity-65">$10.000,00</span>
                <Button rounded>
                    <span>Siguiente</span>
                    <Icon.ArrowRight className="size-4" strokeWidth={3} />
                </Button>
            </nav>
        </section>
    )
}