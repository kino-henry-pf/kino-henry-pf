"use client"

import { useQuery } from "@/hooks/useQuery"
import DataTable from "@/components/DataTable"
import { useEffect, useRef } from "react"
import Loader from "../components/Loader"

export default function ResourcePage<T>({
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
    const query = useQuery<T[]>(resource),
        topSectionRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!topSectionRef.current) return
        const scrollTop = window.scrollY + topSectionRef.current.getBoundingClientRect().top
        window.scrollTo({top: scrollTop - 133.33, behavior: "smooth"})
    }, [topSectionRef, resource])

    return (
        <section ref={topSectionRef} className="w-full h-fit flex flex-col gap-3 relative">
            {
                query.data ? (
                    <>
                        <p className="lg:![padding-right:0] lg:![padding-left:0] container-x-padding">{title} <span className="opacity-50">{!query.isLoading && query.data ? `(${query.data.length})` : null}</span></p>
                        <DataTable
                            resource={resource}
                            head={head}
                            body={query.data.map(mapRow)}
                        />
                    </>
                ) : query.isLoading ? (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <Loader className="size-10" />
                    </div>
                ) : (
                    <span>ERROR</span>
                )
            }
        </section>
    )
}