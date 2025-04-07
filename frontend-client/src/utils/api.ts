type ApiRequestOptions = Omit<RequestInit, 'headers'> & {
    headers?: HeadersInit;
};

// Stocăm token-ul CSRF pentru a nu-l cere de fiecare dată
let csrfToken: string | null = null;

// Obține token-ul CSRF și îl salvează în variabilă
const getCsrfToken = async (): Promise<void> => {
    if (csrfToken) return; // Dacă token-ul există deja, nu mai cerem unul nou

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Unable to fetch CSRF token');
    }
};

// Crează antetele pentru cerere, incluzând antetele implicite și cele personalizate
const getHeaders = (customHeaders?: HeadersInit): HeadersInit => {
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Adăugăm token-ul CSRF dacă există
    if (csrfToken) {
        defaultHeaders['X-XSRF-TOKEN'] = csrfToken;
    }

    // Adăugăm antetele personalizate, dacă există
    if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
            defaultHeaders[key] = value;
        });
    } else if (Array.isArray(customHeaders)) {
        for (const [key, value] of customHeaders) {
            defaultHeaders[key] = value;
        }
    } else if (typeof customHeaders === 'object' && customHeaders !== null) {
        Object.assign(defaultHeaders, customHeaders);
    }

    return defaultHeaders;
};

// Realizează cererea API (GET, POST, etc.) și gestionează răspunsul
const apiRequest = async (url: string, options: ApiRequestOptions = {}) => {
    // Obținem token-ul CSRF dacă nu este deja salvat
    await getCsrfToken();

    // Executăm cererea API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        credentials: 'include', // asigură-te că trimitem cookie-urile
        headers: getHeaders(options.headers),
    });

    // Dacă cererea a eșuat, aruncăm o eroare
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Something went wrong');
    }

    // Returnăm rezultatul cererii ca obiect JSON
    return res.json();
};

// Exportăm metode pentru GET, POST, PUT și DELETE
export const api = {
    get: (url: string, options?: ApiRequestOptions) =>
        apiRequest(url, { method: 'GET', ...options }),

    post: (url: string, body: unknown, options?: ApiRequestOptions) =>
        apiRequest(url, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options,
        }),

    put: (url: string, body: unknown, options?: ApiRequestOptions) =>
        apiRequest(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            ...options,
        }),

    delete: (url: string, options?: ApiRequestOptions) =>
        apiRequest(url, { method: 'DELETE', ...options }),
};

export default apiRequest;