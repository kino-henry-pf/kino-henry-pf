"use client"

import { useAuth } from "@/context/authContext"
import { apiClient } from "@/services/apiClient"
import { useCallback, useEffect, useState } from "react"

export const useQuery = <T>(path: string) => {
    const {dataUser: auth} = useAuth()

    const [_data, _setData] = useState<T | null>(null),
        [_error, _setError] = useState<any | null>(null),
        [_isLoading, _setIsLoading] = useState(true)

    const handleFetch = useCallback(async () => {
        _setIsLoading(true)
        try {
            const apiResponse = await apiClient({
                bearerToken: auth?.access_token
            }).get<T>(path, {
                disableCache: true
            })
            _setData(apiResponse)
        } catch (error) {
            _setError(error)
        } finally {
            _setIsLoading(false)
        }
    }, [path, auth])

    const handleRefetch = useCallback(async () => {
        if (_isLoading) return
        await handleFetch()
    }, [_isLoading, handleFetch])

    useEffect(() => {
        if (!auth) return
        handleFetch()
    }, [auth, handleFetch])

    return {
        data: _data,
        error: _error,
        isLoading: _isLoading,
        refetch: handleRefetch
    }
}