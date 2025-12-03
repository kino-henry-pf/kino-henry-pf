"use client"

import Link from "next/link"
import * as AkarIcon from "akar-icons"
import { useEffect, useRef, useState } from "react"

export default function AccordionMenuItem({
    href,
    label,
    children,
    icon,
    primary = false
}: {
    href: string,
    label: string,
    children?: React.ReactNode,
    icon: keyof typeof AkarIcon,
    primary?: boolean
}) {
    const Icon = AkarIcon[icon],
        parentRef = useRef<HTMLDivElement | null>(null)

    const [_open, _setOpen] = useState(false)

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (!parentRef.current?.contains(event.target as Node)) {
                _setOpen(false)
            }
        }

        document.addEventListener("click", handleDocumentClick)

        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [parentRef])

    return (
        <div
            ref={parentRef}
            className={[
                "w-full h-fit flex rounded-md flex-col transition-[background-color] duration-300",
                _open ? "bg-[var(--background)]" : "bg-transparent"
            ].join(" ")}
        >
            <Link
                onClick={children ? () => _setOpen(!_open) : undefined}
                href={href}
                className={[
                    "w-full h-fit px-4 grid items-center grid-cols-[auto_1fr_auto] gap-4",
                    !children && !primary ? "pl-10 py-2" : "py-3"
                ].join(" ")}
            >
                <Icon className="size-4" />
                <span>{label}</span>
                {
                    children && (
                        <AkarIcon.ChevronDown
                            className={[
                                "size-3 duration-300",
                                _open ? "rotate-180" : ""
                            ].join(" ")}
                        />
                    )
                }
            </Link>
            <div
                className={[
                    "w-full h-fit transition-[max-height] overflow-hidden",
                    _open ? "max-h-[400px] delay-200" : "max-h-0"
                ].join(" ")}
            >
                <div className="pb-2">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}