export default function Button({
    children,
    rounded = false,
    primary = true,
    onClick
}: {
    children: string,
    rounded?: boolean,
    primary?: boolean,
    onClick?: () => any
}) {
    return (
        <button onClick={onClick} className={[
            "w-fit h-fit cursor-pointer py-3 px-6 font-bold text-sm",
            rounded ? "rounded-full" : "rounded-xl",
            primary ? "bg-[var(--color-primary)] text-[var(--primary-foreground)]" : "bg-white/30"
        ].join(" ")}>
            {children}
        </button>
    )
}