export const badRequest = (message) => {
    const err = new Error(message);
    err.status = 400;
    return err;
}

export const unauthorizedRequest = (message) => {
    const err = new Error(message);
    err.status = 401;
    return err;
}

export const notFound = (message) => {
    const err = new Error(message);
    err.status = 404;
    return err;
}

export const recordExists = (message, response) => {
    const err = new Error(message);
    err.status = 409;
    return err
}

export const validationError = (message) => {
    const err = new Error(message);
    err.status = 422;
    return err;
}

export const serverError = (message) => {
    const err = new Error(message);
    err.status = 500;
    return err;
}

export const tokenError = (message) => {
    const err = new Error(message);
    err.status = 502;
    return err;
}

export const handleErrorResponse = (res, error) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({
        success : false,
        error   : true,
        status  : status,
        data    : message
    })
}

export const handleSuccessResponse = (res, resData=[]) => {
    res.status(200).json({
        success : true,
        error   : false,
        status  : 200,
        data    : resData
    })
}