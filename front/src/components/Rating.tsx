import * as Icon from "akar-icons"

export default function Rating({
    value
}: {
    value: number
}) {
    return (
        <div className="w-fit h-fit flex gap-2 items-center">
            <Icon.Star
                className="size-4"
            />
            <span className="text-sm">{value.toFixed(1)}</span>
        </div>
    )
}