export const error = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
}