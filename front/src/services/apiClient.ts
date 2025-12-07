type GetOptions = {
  disableCache?: boolean;
};

type OperationOptions = {
  bearerToken?: string;
  withFiles?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const apiClient = (operationOptions?: OperationOptions) => {
  const baseHeaders: Record<string, string> = {}

  if (operationOptions?.bearerToken) {
    baseHeaders["Authorization"] = `Bearer ${operationOptions.bearerToken}`
  }

  if (!operationOptions?.withFiles) {
    baseHeaders["Content-Type"] = "application/json"
  }

  const get = async <T>(
    path: string,
    options?: GetOptions
  ): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'GET',
      cache: options?.disableCache ? undefined : 'force-cache',
      headers: baseHeaders
    });

    if (!response.ok && response.status !== 304) {
      throw new Error(response.status.toString());
    }

    const responseObject = await response.json();

    return responseObject;
  };

  const post = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
    let finalBody: BodyInit = JSON.stringify(body)
    if (operationOptions?.withFiles) {
      finalBody = new FormData()
      Object.entries(body).map(([key, value]) => {
        (finalBody as FormData).set(key, value as string | Blob)
      })
    }

    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      body: finalBody,
      headers: baseHeaders
    });

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw jsonResponse
    }

    return await jsonResponse;
  };

  const put = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
    let finalBody: BodyInit | undefined
    if (operationOptions?.withFiles) {
      finalBody = new FormData()
      Object.entries(body).map(([key, value]) => {
        (finalBody as FormData).set(key, value as string | Blob)
      })
    } else {
      finalBody = JSON.stringify(body)
    }

    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PUT',
      body: finalBody,
      headers: baseHeaders
    });

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw jsonResponse
    }

    return jsonResponse;
  };

  const patch = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
    let finalBody: BodyInit = JSON.stringify(body)
    if (operationOptions?.withFiles) {
      finalBody = new FormData()
      Object.entries(body).map(([key, value]) => {
        (finalBody as FormData).set(key, value as string | Blob)
      })
    }

    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PATCH',
      body: finalBody,
      headers: baseHeaders
    });

    const jsonResponse = await response.json()
    
    if (!response.ok) {
      throw jsonResponse
    }

    return jsonResponse;
  };

  const del = async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: baseHeaders
    });

    return await response.json();
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};
