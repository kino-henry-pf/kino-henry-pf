"use client"

import { useQuery } from "@/hooks/useQuery"
import DataTable from "@/components/DataTable"

export default function AdminResourcePage<T>({
    resource,
    title,
    head,
    mapRow
}: {
    resource: string,
    title: string,
    head: string[],
    mapRow: (item: T) => {
        resourceId: string,
        value: (string | React.ReactNode)[]
    }
}) {
    const query = useQuery<T[]>(resource)

    return query.data ? (
        <section className="w-full h-fit flex flex-col gap-3">
            <p>{title} <span className="opacity-50">{!query.isLoading && query.data ? `(${query.data.length})` : null}</span></p>
            <DataTable
                resource={resource}
                head={head}
                body={query.data.map(mapRow)}
            />
        </section>
    ) : query.isLoading ? (
        <span>Cargando...</span>
    ) : query.error ? (
        <span>ERROR</span>
    ) : null
}