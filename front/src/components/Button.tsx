export default function Button({
    children,
    onClick
}: {
    children: string,
    onClick?: () => any
}) {
    return (
        <button onClick={onClick} className="w-fit h-fit cursor-pointer py-3 px-6 bg-[var(--color-primary)] text-[var(--primary-foreground)] rounded-md font-bold text-sm">
            {children}
        </button>
    )
}