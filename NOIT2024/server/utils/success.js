export const CreateSuccess = (status, message, data, accessToken) => {
    const success = {
        status: status,
        message: message,
        data: data,
        accessToken: accessToken
    }

    return success;
}