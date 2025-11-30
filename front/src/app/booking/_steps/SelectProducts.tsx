"use client"

import ProductSelector from "@/app/booking/ProductSelector"
import { SelectedProductState } from "./types"
import { useCallback, useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function SelectProductsStep({
    products,
    onChange
}: {
    products: Product[],
    onChange: (selected: SelectedProductState[]) => any
}) {
    const [_selected, _setSelected] = useState<SelectedProductState[]>([])

    const handleSelect = useCallback((product: Product, quantity: number) => {
        _setSelected(prevSelected => {
            if (quantity === 0) {
                return prevSelected.filter(selected => selected.product.id !== product.id)
            }

            const matchSelected = prevSelected.find(selected => product.id === selected.product.id)

            if (matchSelected) {
                matchSelected.quantity = quantity
                return [
                    ...prevSelected.filter(selected =>
                            selected.product.id !== matchSelected.product.id
                    ),
                    {
                        product,
                        quantity
                    }
                ]
            } else {
                return [
                    ...prevSelected,
                    {
                        quantity,
                        product
                    }
                ]
            }
        })
    }, [])

    useEffect(() => {
        onChange(_selected)
    }, [_selected])
    
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Selecciona alimentos, bebidas y productos</h1>
            <div className="container-x-padding w-[900px] max-w-full grid lg:grid-cols-4 grid-cols-2 h-fit gap-8 lg:gap-7 select-none">
                {
                    products.map(product => (
                        <ProductSelector
                            onSelect={quantity => handleSelect(product, quantity)}
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </>
    )
}