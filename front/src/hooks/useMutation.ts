"use client"

import { useAuth } from "@/context/authContext"
import { apiClient } from "@/services/apiClient"
import { useCallback, useState } from "react"

export default function useMutation<T>(resource: string, {
    type,
    withFiles
}: {
    type: "POST" | "PUT" | "DELETE" | "PATCH",
    withFiles?: boolean
}) {
    const {dataUser: auth} = useAuth()

    const [_error, _setError] = useState<unknown | null>(null),
        [_data, _setData] = useState<any | null>(null),
        [_isLoading, _setIsLoading] = useState(false)

    const submit = useCallback(async (body: Record<string, unknown>) => {
        if (_isLoading) return
        _setIsLoading(true)

        const api = apiClient({
            bearerToken: auth?.access_token,
            withFiles
        })
        
        try {
            let submitData: T | undefined
            
            switch(type) {
                case "POST":
                    submitData = await api.post(resource, body)
                    break
                case "PUT":
                    submitData = await api.put(resource, body)
                    break
                case "PATCH":
                    submitData = await api.patch(resource, body)
                    break
                case "DELETE":
                    submitData = await api.del(resource, body)
                    break
            }

            _setData(submitData)
        } catch (error) {
            _setError(error)
        } finally {
            _setIsLoading(false)
        }
    }, [_isLoading, resource, auth])

    return {
        error: _error,
        data: _data,
        isLoading: _isLoading,
        submit
    }
}