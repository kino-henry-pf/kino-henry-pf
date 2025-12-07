"use client"

import { Form, Formik } from "formik"
import { useEffect, useMemo, useRef, useState } from "react"
import Button from "@/components/Button"
import useMutation from "@/hooks/useMutation"
import AlertModal from "@/components/AlertModal"
import { FormField } from "../types"
import Field from "../components/Field"
import { useQuery } from "@/hooks/useQuery"
import { useRouter } from "next/navigation"
import IconButton from "@/components/IconButton"
import * as Icon from "akar-icons"

export default function UpsertResourcePage<T>({
    resource,
    type,
    title,
    submitText,
    successMessage,
    fields,
    getterResource,
    backLink,
    successRedirect,
    mapPreview,
    validate,
    mapError
}: {
    resource: string,
    type: "POST" | "PUT" | "PATCH" | "DELETE",
    title: string,
    submitText: string,
    successMessage: string,
    fields: FormField[],
    getterResource?: string,
    backLink?: string,
    successRedirect?: (query: T | null) => string,
    mapPreview?: (field: T) => string,
    validate?: (values: any) => any,
    mapError: (error: any) => {
        title: string,
        description: string
    }
}) {
    const router = useRouter()

    const topSectionRef = useRef<HTMLDivElement | null>(null)

    const mutation = useMutation<any>(resource, {
        type,
        withFiles: fields.some(field => field.as === "file")
    })

    const query = getterResource ? useQuery<T>(getterResource) : null

    const [_showError, _setShowError] = useState(false),
        [_showSuccess, _setShowSuccess] = useState(false)

    const errorData = useMemo(() => {
        return mapError(mutation.error)
    }, [mutation.error, mapError])

    useEffect(() => {
        if (!topSectionRef.current) return
        const scrollTop = window.scrollY + topSectionRef.current.getBoundingClientRect().top
        window.scrollTo({top: scrollTop - 133.33, behavior: "smooth"})
    }, [topSectionRef])

    useEffect(() => {
        if (mutation.error) {
            _setShowError(true)
        }
    }, [mutation.error])

    useEffect(() => {
        if (mutation.data) {
            _setShowSuccess(true)
        }
    }, [mutation.data])

    return (
        <div className="w-full h-fit" ref={topSectionRef}>
            {
                (!getterResource || (getterResource && query?.data)) && (
                    <>
                        <Formik
                            validateOnMount
                            initialValues={
                                Object.fromEntries(
                                    fields.map(field => [
                                        field.name,
                                        field.as === "select" ? field.options?.[0].value ?? "" : field.as !== "file" ? query?.data?.[field.name as keyof T] ?? "" : ""
                                    ])
                                )
                            }
                            onSubmit={body => mutation.submit(body)}
                            validate={validate}
                        >
                            {
                                ({isValid}) => (
                                    <Form className="w-full h-fit flex flex-col gap-10 container-x-padding lg:![padding-left:0] lg:![padding-right:0] pb-5">
                                        <div className="w-full h-fit flex items-center gap-10">
                                            {
                                                backLink && (
                                                    <IconButton type="link" href={backLink}>
                                                        <Icon.ArrowLeft className="size-5" />
                                                    </IconButton>
                                                )
                                            }
                                            <span>{title}</span>
                                        </div>
                                        <div className="w-full h-fit flex flex-col gap-5">
                                            {
                                                fields.map((field, index) => {
                                                    const preview = query?.data ? (mapPreview?.(query.data)) : undefined
                                                    return <Field disabled={field.isLoading || field.disabled || query?.isLoading || mutation.isLoading} preview={preview} {...field } key={index} />
                                                })
                                            }
                                            <div className="w-full lg:w-[66.6%] lg:ml-auto h-12 flex justify-end pt-4 xl:pt-2">
                                                <Button
                                                    width="100%"
                                                    type="submit"
                                                    loading={mutation.isLoading}
                                                    disabled={!isValid}
                                                >
                                                    {submitText}
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        <AlertModal
                            show={_showError}
                            onClose={() => {
                                _setShowError(false)
                            }}
                            title={errorData.title}
                            description={errorData.description}
                            icon="CircleAlert"
                            shortTitle="Error"
                        />
                        <AlertModal
                            show={_showSuccess}
                            onClose={() => {
                                if (successRedirect) {
                                    router.push(successRedirect(query?.data || null))
                                } else {
                                    _setShowSuccess(false)
                                }
                            }}
                            title={successMessage}
                            icon="CircleCheck"
                            shortTitle="Operación exitosa"
                        />
                    </>
                )
            }
        </div>
    )
}