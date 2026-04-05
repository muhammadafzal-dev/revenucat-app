// PaymentProcessingScenarios.js

const PaymentProcessingScenarios = {
    successfulPayment: {
        status: 'success',
        message: 'Payment processed successfully.',
        transactionId: '12345678',
        amount: 100.00,
        currency: 'USD'
    },
    failedPayment: {
        status: 'failed',
        message: 'Payment failed due to insufficient funds.',
        transactionId: null,
        amount: 100.00,
        currency: 'USD'
    },
    pendingPayment: {
        status: 'pending',
        message: 'Payment is currently pending.',
        transactionId: '87654321',
        amount: 50.00,
        currency: 'USD'
    },
    cancelledPayment: {
        status: 'cancelled',
        message: 'Payment has been cancelled by the user.',
        transactionId: null,
        amount: 75.00,
        currency: 'USD'
    },
    refundedPayment: {
        status: 'refunded',
        message: 'Payment has been refunded.',
        transactionId: '12348765',
        amount: 100.00,
        currency: 'USD'
    }
};

module.exports = PaymentProcessingScenarios;