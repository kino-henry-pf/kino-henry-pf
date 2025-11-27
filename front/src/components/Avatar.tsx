export default function Avatar({
    children
}: {
    children: string
}) {
    return (
        <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-primary)] text-[var(--primary-foreground)] rounded-full">
            <span className="uppercase text-md font-bold">{children[0]}{children[1]}</span>
        </div>
    )
}