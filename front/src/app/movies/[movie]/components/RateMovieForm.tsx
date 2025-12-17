"use client"

import Button from "@/components/Button"
import Field from "@/components/Field"
import { Form, Formik } from "formik"
import validateMovieReview from "../validate/validateMovieReview"
import useMutation from "@/hooks/useMutation"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { Movie } from "@/types/movie"
import { Review } from "@/types/review"

export default function RateMovieForm({
    movie,
    onSuccess
}: {
    movie: Movie,
    onSuccess: () => any
}) {
    const {dataUser: auth} = useAuth(),
        {submit, error, data} = useMutation<Review>("reviews", {
            type: "POST"
        })

    const handleSubmit = useCallback(async (values: {
        rating: number,
        review: string
    }) => {
        if (!auth?.user) return

        const rating = values.rating.toFixed(1)

        try {
            await submit({
                rating,
                review: values.review,
                movieId: movie.id,
                userId: auth.user.id
            })

            onSuccess()
        } catch {
            toast.error(
                (error as {message: string}).message
            )
        }
    }, [submit, auth, movie, error])

    return (
        <Formik
            initialValues={{
                rating: 1,
                review: ""
            }}
            onSubmit={handleSubmit}
            validateOnMount
            validate={validateMovieReview}
        >
            {
                ({isValid, isSubmitting, resetForm, values}) => {
                    useEffect(() => {
                        if (!data) return
                        resetForm()
                    }, [resetForm, data])

                    return (
                        <Form className="w-full h-fit flex flex-col gap-10">
                            <div className="w-full h-fit flex flex-col gap-5">
                                <Field
                                    label="Rating"
                                    name="rating"
                                    type="stars"
                                    as="stars"
                                    icon="Star"
                                    defaultValue={values.rating}
                                />
                                <Field
                                    label="Comment"
                                    name="review"
                                    type="textarea"
                                    as="textarea"
                                    icon="Pencil"
                                    required
                                />
                            </div>
                            <div className="w-full h-fit grid grid-cols-[1fr_2fr]">
                                <span></span>
                                <Button type="submit" width="100%" loading={isSubmitting} disabled={!isValid}>Post review</Button>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}