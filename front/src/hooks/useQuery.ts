"use client"

import { useAuth } from "@/context/authContext"
import { apiClient } from "@/services/apiClient"
import { useCallback, useEffect, useState } from "react"

export const useQuery = <T>(path: string) => {
    const {dataUser: auth} = useAuth()

    const [_data, _setData] = useState<T | null>(null),
        [_error, _setError] = useState<any | null>(null),
        [_isLoading, _setIsLoading] = useState(false)

    const handleFetch = useCallback(async () => {
        _setIsLoading(true)
        try {
            const apiResponse = await apiClient().get<T>(path, auth?.access_token ? {
                BearerToken: auth.access_token
            } : undefined)
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