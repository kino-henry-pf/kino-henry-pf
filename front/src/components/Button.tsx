export default function Button({
    children,
    rounded = false,
    primary = true,
    width,
    type = "button",
    danger = false,
    loading,
    disabled,
    onClick
}: {
    children: React.ReactNode,
    rounded?: boolean,
    primary?: boolean,
    width?: string,
    type?: "button" | "submit",
    loading?: boolean,
    disabled?: boolean,
    danger?: boolean,
    onClick?: () => any
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={[
                "w-fit h-fit cursor-pointer py-3 px-6 font-semibold text-sm flex items-center justify-center gap-2 transition-[transform,scale,background-color] duration-200 active:scale-99",
                rounded ? "rounded-full" : "rounded-md",
                danger ? "bg-red-500/30 hover:bg-red-500/50 text-red-200 border-1 border-red-500/60" : primary ? "bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] text-[var(--primary-foreground)]" : "bg-white/10",
                loading ? "opacity-70 pointer-events-none" : "",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}
            style={{width}}
        >
            {children}
        </button>
    )
}