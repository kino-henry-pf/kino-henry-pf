"use client"

import { Review } from "@/types/review"
import Avatar from "./Avatar"
import Rating from "./Rating"
import { useAuth } from "@/context/authContext"
import IconButton from "./IconButton"
import * as Icon from "akar-icons"
import { useState } from "react"
import AlertModal from "./AlertModal"
import Button from "./Button"
import useMutation from "@/hooks/useMutation"
import { useRouter } from "next/navigation"

export default function OpinionCard({
    review
}: {
    review: Review
}) {
    const {dataUser: auth} = useAuth(),
        router = useRouter(),
        {submit, isLoading} = useMutation<Review>(`reviews/${review.id}`, {
            type: "DELETE"
        })

    const [_deleteDialog, _setDeleteDialog] = useState(false)

    return (
        <>
            <article className="w-full h-fit p-7 flex flex-col gap-5 rounded-xl border-[var(--color-border)] border-1">
                <div className="w-full h-fit grid grid-cols-[1fr_auto] items-start gap-5 justify-between">
                    <div className="w-fit h-fit grid grid-cols-[auto_auto] items-center gap-3">
                        <Avatar>{review.user.name.split(" ")[0]}</Avatar>
                        <span className="text-md font-semibold text-ellipsis overflow-hidden max-w-full whitespace-nowrap">{review.user.name}</span>
                    </div>
                    <div className="flex items-center gap-5 w-fit h-fit">
                        <Rating value={review.rating.split(".")[0]} />
                        {
                            auth?.user.id === review.user.id && (
                                <IconButton small onClick={() => _setDeleteDialog(true)}>
                                    <Icon.TrashBin className="size-4" />
                                </IconButton>
                            )
                        }
                    </div>
                </div>
                <p>{review.review}</p>
            </article>
            <AlertModal
                shortTitle="Delete review"
                title="Are you sure?"
                description="The review will be removed"
                icon="CircleAlert"
                actions={
                    <nav className="w-full h-fit grid grid-cols-[1fr_auto] gap-5">
                        <Button
                            loading={isLoading}
                            width="100%"
                            primary={false}
                            onClick={() => _setDeleteDialog(false)}
                        >Cancel</Button>
                        <Button
                            loading={isLoading}
                            onClick={async () => {
                                await submit({})
                                router.refresh()
                            }}
                        >Continue</Button>
                    </nav>
                }
                isLoading={isLoading}
                onClose={() => _setDeleteDialog(false)}
                show={_deleteDialog}
            />
        </>
    )
}