class ErrorHandler {
    constructor() {
        // Initialize any properties if necessary
    }

    logError(error) {
        // Log the error details to a logging service or the console
        console.error(`Error: ${error.message}`);
        // You can further enhance this to log to an external service
    }

    handlePurchaseError(error) {
        // Handle purchase error with necessary actions
        this.logError(error);
        // You can add other error handling functionalities here
    }
}

module.exports = new ErrorHandler();