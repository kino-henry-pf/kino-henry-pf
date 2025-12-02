import * as AkarIcon from "akar-icons"

export default function DataCard({
    icon,
    value,
    label
}: {
    icon: keyof typeof AkarIcon
    value: string,
    label: string
}) {
    const Icon = AkarIcon[icon]

    return (
        <div className="w-full h-full flex flex-col gap-3 bg-[var(--color-primary)]/5 rounded-xl border-1 border-[var(--color-primary)] p-5">
            <Icon className="size-5 text-[var(--color-primary)]" />
            <h2 className="text-5xl font-bold">{value}</h2>
            <p className="text-md font-semibold opacity-65">{label}</p>
        </div>
    )
}