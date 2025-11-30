"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import * as Icon from "akar-icons"
import { Product } from "@/types/product";

export default function MovieSelector({
    product,
    onSelect
}: {
    product: Product,
    onSelect: (quantity: number) => any
}) {
    const [_quantity, _setQuantity] = useState(0)

    useEffect(() => {
        onSelect(_quantity)
    }, [onSelect, _quantity])

    return (
        <div className="w-full h-auto relative overflow-hidden rounded-2xl hover:scale-101 active:scale-99 transition-[transform,scale] rounded-2xl">
            <button
                className={[
                    "absolute top-3 left-3 w-10 h-10 bg-[var(--color-primary)] text-[var(--primary-foreground)] flex items-center justify-center rounded-full shadow-md transition-[transform,scale,opacity] duration-250 hover:scale-110 cursor-pointer active:scale-90 pointer-events-none",
                    _quantity === 0 ? "opacity-0 scale-120" : ""
                ].join(" ")}
            >
                <Icon.Check className="size-4" />
            </button>
            <button
                onClick={() => {
                    if (_quantity === 0) {
                        _setQuantity(1)
                    } else {
                        _setQuantity(0)
                    }
                }}
                className="cursor-pointer w-full h-fit min-h-full bg-white rounded-2xl block"
            >
                <Image
                    width={267}
                    height={400}
                    alt={product.name}
                    src={product.image}
                    className="w-full h-auto rounded-2xl"
                />
            </button>
            <div
                className={[
                    "absolute w-full bottom-0 left-0 rounded-b-2xl h-fit backdrop-blur-xs transition-[transform,scale,opacity] duration-250 grid grid-cols-[auto_1fr_auto] items-center p-3 bg-black/50",
                    _quantity === 0 ? "scale-170 opacity-0 pointer-events-none" : ""
                ].join(" ")}
            >
                <IconButton
                    small
                    style={{backdropFilter: "none"}}
                    onClick={() => _setQuantity(_quantity-1)}
                >
                    <Icon.Minus />
                </IconButton>
                <input disabled className="w-full h-fit text-center font-semibold text-xl" type="number" value={(_quantity === 0 ? 1 : _quantity).toString()} onInput={event => _setQuantity(parseInt(event.currentTarget.value))} />
                <IconButton
                    small
                    style={{backdropFilter: "none"}}
                    onClick={() => _setQuantity(_quantity+1)}
                >
                    <Icon.Plus />
                </IconButton>
            </div>
        </div>
    )
}