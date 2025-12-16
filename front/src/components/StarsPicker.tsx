"use client"

import * as Icon from "akar-icons"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"

export default function StarsPicker({
    name,
    value,
    onChange
}: {
    name: string,
    value: number,
    onChange?: (value: number) => any
}) {
    const [_stars, _setStars] = useState(value || 1),
        formikContext = useFormikContext()

    useEffect(() => {
        onChange?.(_stars)
    }, [_stars, onChange])

    useEffect(() => {
        _setStars(value || 1)
    }, [value])

    return (
        <div className="w-full h-fit flex items-center gap-2 justify-center">
            {
                Array.from({length: 5}).map((_, number) => (
                    <button
                        key={number}
                        onClick={() => {
                            _setStars(number + 1)
                            formikContext.setFieldValue(name, number + 1)
                        }}
                        className="w-fit h-fit"
                        type="button"
                    >
                        <Icon.Star
                            className={[
                                "size-7",
                                _stars > number && "fill-[var(--color-primary)] stroke-[var(--color-primary)]"
                            ].join(" ")}
                        />
                    </button>
                ))
            }
        </div>
    )
}