"use client"

import * as Icon from "akar-icons"
import IconButton from "./IconButton"
import Button from "./Button"
import React from "react"

export default function AlertModal({
    show = false,
    shortTitle,
    title,
    description,
    icon,
    actions,
    isLoading,
    onClose
}: {
    show?: boolean,
    shortTitle?: string,
    title: string,
    description?: string,
    icon?: keyof typeof Icon,
    actions?: React.ReactNode,
    isLoading?: boolean,
    onClose?: () => any
}) {
    const ModalIcon = icon ? Icon[icon] : null
    
    return (
        <div
            className={[
                "w-full h-full fixed z-99999 top-0 left-0 bg-black/50 backdrop-blur-md flex items-center justify-center flex-col overflow-auto p-10 transition-opacity duration-200",
                !show ? "pointer-events-none opacity-0" : ""
            ].join(" ")}
            onClick={!isLoading ? onClose : undefined}
        >
            <div
                onClick={event => event.stopPropagation()}
                className={[
                    "w-[400px] max-w-full bg-[var(--background)] border-1 border-[var(--color-border)] p-10 rounded-2xl flex flex-col items-center text-center transition-[transform,translate,opacity] duration-300 gap-10",
                    !show ? "translate-y-10 opacity-0" : "",
                    isLoading ? "!cursor-default opacity-50 pointer-events-none" : ""
                ].join(" ")}
            >
                <div className="w-full h-fit flex grid grid-cols-[1fr_auto] gap-5 text-left items-center">
                    <span className="text-md font-semibold">{shortTitle}</span>
                    <IconButton small onClick={!isLoading ? onClose : undefined}>
                        <Icon.Cross className="size-4" />
                    </IconButton>
                </div>
                <div className="w-full h-fit flex flex-col gap-5 items-center">
                    {
                        ModalIcon && (
                            <ModalIcon className="size-24" />
                        )
                    }
                    <span className="text-2xl font-bold">
                        {title}
                    </span>
                    {
                        description && (
                            <p>{description}</p>
                        )
                    }
                </div>
                {
                    !actions ? (
                        <Button onClick={!isLoading ? onClose : undefined} width="100%">Cerrar</Button>
                    ) : actions
                }
            </div>
        </div>
    )
}