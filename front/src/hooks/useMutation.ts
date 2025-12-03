"use client"

import { useCallback, useState } from "react"

export default function useMutation<T>({
    handleSubmit
}: {
    handleSubmit: () => Promise<T>
}): {
    error: unknown | null
    data: T | null
    isLoading: boolean
} {
    const [_error, _setError] = useState<unknown | null>(null),
        [_data, _setData] = useState<any | null>(null),
        [_isLoading, _setIsLoading] = useState(false)

    const submit = useCallback(async () => {
        if (_isLoading) return
        _setIsLoading(true)
        
        try {
            const submitData = await handleSubmit()
            _setData(submitData)
        } catch (error) {
            _setError(error)
        } finally {
            _setIsLoading(false)
        }
    }, [_isLoading])

    return {
        error: _error,
        data: _data,
        isLoading: _isLoading
    }
}