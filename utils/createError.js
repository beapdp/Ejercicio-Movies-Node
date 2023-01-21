//A través de esta función creo un objeto de error personalizado, con un mensaje y estado específico.
const createError = (msg, status) => {
    const error = new Error(msg);
    error.status = status;
    return error;
}

module.exports = createError;