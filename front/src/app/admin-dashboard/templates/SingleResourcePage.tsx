"use client"

import IconButton from "@/components/IconButton"
import { useQuery } from "@/hooks/useQuery"
import { useEffect, useMemo, useRef, useState } from "react"
import * as Icon from "akar-icons"
import Image from "next/image"
import useMutation from "@/hooks/useMutation"
import AlertModal from "@/components/AlertModal"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import Loader from "../../../components/Loader"

export default function SingleResourcePage<T>({
    resource,
    editLink,
    backLink,
    deleteResource,
    mapData
}: {
    resource: string,
    editLink: string,
    backLink: string,
    deleteResource?: {
        title: string,
        description: (resource: T) => string,
        path: string,
        type?: "DELETE" | "PATCH",
        successRedirect: string
    },
    mapData: (item: T) => {
        title: string,
        image?: string,
        rows: {
            name: string,
            value: string
        }[]
    }
}) {
    
    const query = useQuery<T>(resource),
        router = useRouter(),
        topSectionRef = useRef<HTMLDivElement | null>(null)

    const [_deleteDialog, _setDeleteDialog] = useState(false)

    const deleteMutation = deleteResource ? useMutation(deleteResource.path, {
        type: deleteResource.type || "DELETE"
    }) : null

    const data = useMemo(() => {
        if (!query.data) return
        return mapData(query.data)
    }, [mapData, query.data])

    useEffect(() => {
        if (!topSectionRef.current) return
        const scrollTop = window.scrollY + topSectionRef.current.getBoundingClientRect().top
        if (!scrollTop) return
        window.scrollTo({top: scrollTop - 133.33, behavior: "smooth"})
    }, [topSectionRef, resource, data])

    return (
        <section className="w-full h-fit" ref={topSectionRef}>
            {
                data ? (
                    <>
                        <div className="w-full h-fit flex flex-col gap-10 container-x-padding lg:![padding-left:0] lg:![padding-right:0]">
                            <div className="w-full flex items-center gap-10 justify-between">
                                <div className="w-full h-fit flex items-center gap-10">
                                    <IconButton scroll={false} type="link" href={backLink}>
                                        <Icon.ArrowLeft className="size-5" />
                                    </IconButton>
                                    <span>{data.title}</span>
                                </div>
                                <nav className="w-fit h-fit flex items-center gap-3">
                                    {
                                        editLink && (
                                            <IconButton scroll={false} small type="link" href={editLink}>
                                                <Icon.Edit className="size-4" />
                                            </IconButton>
                                        )
                                    }
                                    {
                                        deleteResource && (
                                            <IconButton small onClick={() => _setDeleteDialog(true)}>
                                                <Icon.TrashBin className="size-4" />
                                            </IconButton>
                                        )
                                    }
                                </nav>
                            </div>
                            <div
                                className={[
                                    "h-fit",
                                    data.image ? "grid lg:grid-cols-[auto_1fr] gap-5" : "w-fit"
                                ].join(" ")}
                            >
                                {
                                    data.image ? (
                                        <Image
                                            alt={data.title}
                                            src={data.image}
                                            width={300}
                                            height={300}
                                            className="w-[16rem] auto object-contain"
                                        />
                                    ) : null
                                }
                                <div className="w-full h-fit flex flex-col gap-5">
                                    {
                                        data.rows.map((row, index) => (
                                            <div key={index} className="w-fit h-fit grid grid-cols-[auto_1fr] items-center gap-5">
                                                <div className="w-full h-fit flex justify-start text-md">
                                                    <span>{row.name}</span>
                                                </div>
                                                <div className="w-fit ml-auto h-fit flex justify-end text-md font-semibold bg-white/3 rounded-md border-1 border-[var(--color-border)] py-1 px-2">
                                                    <span>{row.value}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            deleteResource && query.data && (
                                <AlertModal
                                    show={_deleteDialog}
                                    title={deleteResource.title}
                                    shortTitle="Delete"
                                    description={deleteResource.description(query.data)}
                                    icon="TrashBin"
                                    onClose={() => _setDeleteDialog(false)}
                                    isLoading={deleteMutation?.isLoading || query.isLoading || deleteMutation?.data}
                                    actions={
                                        <nav className="w-full h-fit grid grid-cols-[1fr_auto] gap-5">
                                            <Button
                                                width="100%"
                                                primary={false}
                                                onClick={() => {
                                                    _setDeleteDialog(false)
                                                }}
                                            >Cancel</Button>
                                            <Button
                                                onClick={async () => {
                                                    await deleteMutation?.submit({})
                                                    router.push(deleteResource.successRedirect)
                                                }}
                                            >Delete</Button>
                                        </nav>
                                    }
                                />
                            )
                        }
                    </>
                ) : query.isLoading ? (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <Loader className="size-10" />
                    </div>
                ) : (
                    <p>ERROR</p>
                )
            }
        </section>
    )
}