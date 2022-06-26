export function addQueryToPath(path: string, query: Record<string, string>): string {
    const queryParams = new URLSearchParams(path.split('?')[1] || '');

    for (const [key, value] of Object.entries(query)) {
        queryParams.set(key, value);
    }

    return path.split('?')[0] + '?' + queryParams;
}


export function getToken(api): string | null {
    return api.defaults.headers.common['Authorization']?.split(' ')[1] || null;
}

export function addTokenToURL(url: string, api): string {
    const accessToken = getToken(api);
    if (!accessToken) return url;

    return addQueryToPath(url, { access_token: accessToken });
}
