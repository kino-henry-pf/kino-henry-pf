import * as Icon from "akar-icons"

export default function Searcher({
    value,
    onInput
}: {
    value: string,
    onInput: (value: string) => any
}) {
    return (
        <label className="w-[420px] max-w-full cursor-text bg-white/3 rounded-full flex items-center gap-3 p-3 border-1 border-[var(--color-border)] w-full">
            <Icon.Search className="size-5" />
            <input
                placeholder="Busca aquí..."
                className="w-full h-full text-md"
                onInput={event => onInput(event.currentTarget.value)}
                value={value}
            />
        </label>
    )
}