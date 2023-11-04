class CustomAPIError extends Error {
    constructor(messsage) {
        super(messsage)
    }
}

module.exports = CustomAPIError;