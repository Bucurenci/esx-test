export const getErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
    if (error && typeof error === 'object' && 'message' in error) {
        return String((error as { message?: string }).message || fallback);
    }

    return fallback;
};