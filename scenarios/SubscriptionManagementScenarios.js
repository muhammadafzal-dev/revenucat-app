'use strict';

// Subscription management scenarios

const subscriptionScenarios = {
    active: {
        status: 'active',
        description: 'The subscription is currently active and all features are available.'
    },
    cancelled: {
        status: 'cancelled',
        description: 'The subscription has been cancelled and will not renew.'
    },
    expired: {
        status: 'expired',
        description: 'The subscription has expired and access to features is restricted.'
    },
    paused: {
        status: 'paused',
        description: 'The subscription is temporarily paused and will resume at a later date.'
    },
    upgraded: {
        status: 'upgraded',
        description: 'The subscription has been upgraded to a higher plan with additional features.'
    },
    downgraded: {
        status: 'downgraded',
        description: 'The subscription has been downgraded to a lower plan with fewer features.'
    },
    trial: {
        status: 'trial',
        description: 'The subscription is in the trial period and features are limited until upgraded.'
    }
};

module.exports = subscriptionScenarios;