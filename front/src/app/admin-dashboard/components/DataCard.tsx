import * as AkarIcon from "akar-icons"

export default function DataCard({
    icon,
    value,
    label,
    color
}: {
    icon: keyof typeof AkarIcon
    value: string,
    label: string,
    color: "purple" | "orange" | "cyan"
}) {
    const Icon = AkarIcon[icon]

    return (
        <div
            className={[
                "w-full h-full flex flex-col gap-5 rounded-md border-1 border-b-4 p-5",
                color === "cyan" ? "bg-cyan-500/2 border-cyan-500"
                    : color === "orange" ? "bg-orange-500/2 border-orange-500"
                    : "bg-purple-500/2 border-purple-500"
            ].join(" ")}
        >
            <Icon
                className={[
                    "size-5",
                    color === "cyan" ? "text-cyan-300"
                        : color === "orange" ? "text-orange-300"
                        : "text-purple-300"
                ].join(" ")}
            />
            <h2
                className={[
                    "text-2xl font-semibold leading-1",
                    color === "cyan" ? "text-cyan-100"
                        : color === "orange" ? "text-orange-100"
                        : "text-purple-100"
                ].join(" ")}
            >{value}</h2>
            <p className="text-md font-semibold opacity-65">{label}</p>
        </div>
    )
}