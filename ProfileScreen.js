import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
  // Placeholder for subscription details
  const subscriptionDetails = {
    plan: 'Premium',
    status: 'Active',
    renewalDate: '2026-05-05',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  };

  const handleManagePurchases = () => {
    // Logic to manage purchases goes here
    console.log('Manage purchases clicked');
  };

  return (
    <View>
      <Text>User Subscription Details</Text>
      <Text>Plan: {subscriptionDetails.plan}</Text>
      <Text>Status: {subscriptionDetails.status}</Text>
      <Text>Renewal Date: {subscriptionDetails.renewalDate}</Text>
      <Text>Features:</Text>
      <ul>{subscriptionDetails.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <Button title="Manage Purchases" onPress={handleManagePurchases} />
    </View>
  );
};

export default ProfileScreen;