// PurchaseScenarios.js

const purchaseScenarios = [
    {
        type: 'Monthly Subscription',
        description: 'User pays a recurring fee each month.',
        cost: '9.99',
        benefits: ['Access to all features', 'Cancel anytime']
    },
    {
        type: 'Yearly Subscription',
        description: 'User pays a recurring fee each year.',
        cost: '99.99',
        benefits: ['Access to all features', 'Cancel anytime', 'Discount compared to monthly']
    },
    {
        type: 'One-Time Purchase',
        description: 'User pays a single fee for lifetime access.',
        cost: '199.99',
        benefits: ['Access to all features for life', 'No recurring fees']
    },
    {
        type: 'Free Trial',
        description: 'User gets access to premium features for a limited time.',
        duration: '14 days',
        benefits: ['Full access during trial', 'No payment required']
    },
    {
        type: 'Upgrade/Downgrade',
        description: 'User can upgrade or downgrade their plan as needed.',
        options: ['Switch from monthly to yearly', 'Switch between plans without fees'],
        benefits: ['Flexibility to change plans']
    },
    {
        type: 'Family Plan',
        description: 'User pays a single fee for multiple family members.',
        cost: '149.99',
        benefits: ['Access for up to 5 family members', 'Cost-effective compared to individual plans']
    }
];

export default purchaseScenarios;
