export interface RequestOptions {
    method: string
    headers: {
        Authorization?: string
        'Content-Type': string
    },
    body?: string
}

export const request = async (url: string, options?: RequestOptions) => {
    return await fetch(url, options)
}
