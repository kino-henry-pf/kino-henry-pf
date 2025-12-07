export default function Button({
    children,
    rounded = false,
    primary = true,
    width,
    type = "button",
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
    onClick?: () => any
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={[
                "w-fit h-fit cursor-pointer py-3 px-6 font-bold text-sm flex items-center justify-center gap-2 transition-[transform,scale,background-color] duration-200 active:scale-99",
                rounded ? "rounded-full" : "rounded-md",
                primary ? "bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] text-[var(--primary-foreground)]" : "bg-white/30",
                loading ? "opacity-70 pointer-events-none" : "",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}
            style={{width}}
        >
            {children}
        </button>
    )
}