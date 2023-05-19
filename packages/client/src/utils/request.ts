export interface RequestOptions {
    method: string
    headers: {
        Authorization?: string
        'Content-Type': string
    },
    body?: string
}

export const request = async (url: string, options?: RequestOptions) => {
    const response = await fetch(url, options)
    return checkResponse(response)
}

const checkResponse = (response: Response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Error ${response.status}`)
}
