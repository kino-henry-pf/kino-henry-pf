"use client"

import Link from "next/link"
import * as AkarIcon from "akar-icons"
import { useMemo, useRef } from "react"
import { usePathname } from "next/navigation"

export default function AccordionMenuItem({
    href,
    label,
    children,
    icon,
    primary = false,
    onClick
}: {
    href: string,
    label: string,
    children?: React.ReactNode,
    icon: keyof typeof AkarIcon,
    primary?: boolean,
    onClick?: () => any
}) {
    const pathname = usePathname()

    const Icon = AkarIcon[icon],
        parentRef = useRef<HTMLDivElement | null>(null)

    const isOpen = useMemo(() => {
        return (pathname.startsWith(href) && children)
    }, [pathname, children, href])

    return (
        <div
            ref={parentRef}
            className={[
                "w-full h-fit flex rounded-md flex-col",
                isOpen ? "bg-[var(--background)]" : "bg-transparent"
            ].join(" ")}
        >
            <Link
                onClick={onClick}
                href={href}
                className={[
                    "w-full h-fit px-4 grid items-center grid-cols-[auto_1fr_auto] gap-4",
                    !children && !primary ? "pl-10 py-2" : "py-3"
                ].join(" ")}
                scroll={false}
            >
                <Icon className="size-4" />
                <span>{label}</span>
                {
                    children && (
                        <AkarIcon.ChevronRight
                            className={[
                                "size-3 transition-[transform,rotate] duration-300",
                                isOpen ? "rotate-90" : ""
                            ].join(" ")}
                        />
                    )
                }
            </Link>
            <div
                className={[
                    "w-full h-fit overflow-hidden",
                    isOpen ? "max-h-[400px]" : "max-h-0"
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