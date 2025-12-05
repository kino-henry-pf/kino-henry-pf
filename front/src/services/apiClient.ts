type GetOptions = {
  disableCache?: boolean;
};

type OperationOptions = {
  bearerToken?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL,
  DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
console.log(API_URL);

export const apiClient = () => {
  const get = async <T>(
    path: string,
    options?: GetOptions & OperationOptions
  ): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'GET',
      cache: options?.disableCache ? undefined : 'force-cache',
      headers: options?.bearerToken
        ? {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${options?.bearerToken}`,
          }
        : DEFAULT_HEADERS,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseObject = await response.json();

    return responseObject;
  };

  const post = async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    });

    return await response.json();
  };

  const put = async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    });

    return await response.json();
  };

  const patch = async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PATCH',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    });

    return await response.json();
  };

  const del = async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'DELETE',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
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
