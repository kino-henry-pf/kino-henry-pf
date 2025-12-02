type GetOptions = {
    disableCache?: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kino-henry-pf.onrender.com",

    DEFAULT_HEADERS = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

export const useApi = () => {
    const get = async <T>(path: string, options?: GetOptions): Promise<T> => {
        const response = await fetch(`${API_URL}/${path}`, {
            method: "GET",
            cache: options?.disableCache ? undefined : "force-cache"
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const responseObject = await response.json()

        return responseObject
    }

    const post = async <T>(path: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}/${path}`, {
            method: "POST",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    const put = async <T>(path: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}/${path}`, {
            method: "PUT",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    const patch = async <T>(path: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}/${path}`, {
            method: "PATCH",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    const del = async <T>(path: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}/${path}`, {
            method: "DELETE",
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    return {
        get,
        post,
        put,
        patch,
        del
    }
}