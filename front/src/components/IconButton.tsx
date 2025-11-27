import { CSSProperties } from "react"
import * as Icon from "akar-icons"

export default function IconButton({
    children,
    style,
    onClick
}: {
    children: React.ReactNode,
    style?: CSSProperties,
    onClick?: () => any
}) {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer rounded-full w-14 h-14 flex items-center justify-center bg-white/20 z-10 backdrop-blur-md border-white/10 border-1"
            style={style}
        >
            {children}
        </button>
    )
}