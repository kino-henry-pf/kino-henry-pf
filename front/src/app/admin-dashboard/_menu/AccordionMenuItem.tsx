import Link from "next/link"
import * as Icon from "akar-icons"

export default function MenuItem({
    href,
    children
}: {
    href: string
    children?: React.ReactNode
}) {
    return (
        <>
            <Link href={href} className="w-full h-fit px-4 py-3 grid-cols-[auto_1fr_auto] gap-3">
                {children}
                {
                    children && (
                        <Icon.ChevronRight className="size-4" />
                    )
                }
            </Link>
        </>
    )
}