import { CSSProperties } from "react"

export default function IconButton({
    children,
    style,
    small,
    onClick
}: {
    children: React.ReactNode,
    style?: CSSProperties,
    small?: boolean,
    onClick?: () => any
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "cursor-pointer rounded-full flex items-center justify-center bg-white/20 z-10 backdrop-blur-md border-white/10 border-1 hover:scale-105 active:scale-95 transition-[transform,scale]",
                !small ? "w-14 h-14" : "w-10 h-10"
            ].join(" ")}
            style={style}
        >
            {children}
        </button>
    )
}