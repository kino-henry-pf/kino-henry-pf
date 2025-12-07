"use client"

import { useField } from "formik";
import Image from "next/image";
import * as Icon from "akar-icons"
import { useEffect, useState } from "react";

export default function UploadImage({
    preview,
    name,
    label,
    required,
    ...props
}: {
    preview?: string
    name: string
    label: string
    required?: boolean
}) {
    const [,, helpers] = useField(name),
        [_preview, _setPreview] = useState(preview ?? null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0]
        helpers.setValue(file)

        if (file) {
            const url = URL.createObjectURL(file)
            _setPreview(url)
        }
    }

    useEffect(() => {
        return () => {
            if (!_preview) return
            URL.revokeObjectURL(_preview)
        }
    }, [_preview])

    return (
        <div className="w-full h-full relative">
            <input type="file" accept="image/png,image/jpg,image/jpeg,image/webp" {...props} onChange={handleChange} className="absolute top-0 left-0 opacity-0 w-full h-full z-99" />
            <div className="w-full h-full flex items-center justify-center">
                {
                    _preview ? (
                        <Image
                            alt=""
                            src={_preview}
                            width={250}
                            height={250}
                            className="w-full h-full object-contain"
                        />
                    ) : <div className="w-full h-full flex items-center justify-center opacity-60 flex-col gap-5 pr-6">
                        <Icon.Image className="size-10" />
                        <span className="text-xl font-bold">Seleccione una imagen</span>
                    </div>
                }
            </div>
        </div>
    )
}