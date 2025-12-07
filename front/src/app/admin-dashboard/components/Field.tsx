"use client"

import { ErrorMessage, Field as FormikField } from "formik";
import { FormField } from "../types";
import * as Icon from "akar-icons"
import UploadImage from "./UploadImage";

export default function Field(field: FormField) {
    const FieldIcon = field.icon ? Icon[field.icon] : null

    return (
        <div key={field.name} className="flex flex-col gap-1">
            <label className="w-full h-fit grid lg:grid-cols-[1fr_2fr] items-center">
                <div className="w-full grid items-center grid-cols-[auto_1fr] gap-7 pr-7">
                    <span>{field.label} {
                        field.required && (
                            <span className="text-orange-400">*</span>
                        )    
                    }</span>
                    <div className="w-full h-1 rounded-full bg-white/6 hidden lg:block"></div>
                </div>
                <div
                    className={[
                        "grid grid-cols-[auto_1fr] grid-rows-[100%] bg-white/3 border-1 border-[var(--color-border)] rounded-md w-full px-4 focus-within:shadow-[0_0_0_.2rem_rgb(255_255_255_/_10%)] shadow-[0_0_0_.2rem_rgb(255_255_255_/_0%)] transition-shadow",
                        field.as === "textarea" || field.as === "file" ? "h-32 py-3 items-start" : "items-center min-h-12",
                        field.as === "file" ? "h-52" : ""
                    ].join(" ")}
                >
                    {
                        FieldIcon && <FieldIcon
                            className={[
                                "size-4 opacity-50",
                                field.as === "textarea" ? "mt-1" : ""
                            ].join(" ")}
                        />
                    }
                    {
                        field.type !== "file" && field.as !== "file" ? (
                            <FormikField
                                key={field}
                                type={field.type || "text"}
                                name={field.name}
                                as={field.as}
                                placeholder={field.placeholder}
                                className={[
                                    "px-3 w-full !h-full",
                                    field.isLoading || field.disabled ? "opacity-50 pointer-events-none" : "",
                                    field.as === "textarea" ? "resize-none" : ""
                                ].join(" ")}
                                disabled={field.isLoading || field.disabled}
                                autoFocus={field.autoFocus}
                                autoComplete="off"
                            >
                                {
                                    field.options?.map(option => (
                                        <option key={option.value} value={option.value} className="bg-[var(--background)] text-[var(--foreground)] rounded-md">{option.label}</option>
                                    )) || null
                                }
                            </FormikField>
                        ) : (
                            <UploadImage
                                preview={field.preview}
                                name={field.name}
                                label={field.label}
                                required={field.required}
                            />
                        )
                    }
                </div>
            </label>
            <ErrorMessage
                name={field.name}
                component="p"
                className="w-full h-fit text-sm text-red-300 text-right"
            />
        </div>
    )
}