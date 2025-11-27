type GetOptions = {
    disableCache?: boolean
}

const API_URL = "http://localhost:3001",
    DEFAULT_HEADERS = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

const cacheMap = new Map<string, any>()

export const useApi = () => {
    const get = async <T>(path: string, options?: GetOptions): Promise<T> => {
        if (!cacheMap.get(path) || options?.disableCache) {
            const response = await fetch(`${API_URL}/${path}`, {
                method: "GET"
            })

            const responseObject = await response.json()

            cacheMap.set(path, responseObject)

            return responseObject
        }

        return cacheMap.get(path)
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