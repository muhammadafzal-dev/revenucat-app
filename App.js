import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Purchases from 'react-native-purchases';

const App = () => {
  const [offerings, setOfferings] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const initializeRevenueCat = async () => {
    try {
      setLoading(true);
      // Initialize RevenueCat with your API key
      await Purchases.configure({
        apiKey: 'YOUR_REVENUCAT_API_KEY',
        appUserID: null, // Let RevenueCat generate a unique ID
      });

      // Fetch offerings and customer info
      await fetchOfferings();
      await fetchCustomerInfo();
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      Alert.alert('Error', 'Failed to initialize purchases');
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings);
    } catch (error) {
      console.error('Failed to fetch offerings:', error);
    }
  };

  const fetchCustomerInfo = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(customerInfo);
    } catch (error) {
      console.error('Failed to fetch customer info:', error);
    }
  };

  const handlePurchase = async (package_) => {
    try {
      setPurchasing(true);
      const { customerInfo } = await Purchases.purchasePackage(package_);
      setCustomerInfo(customerInfo);
      Alert.alert('Success', 'Purchase completed successfully!');
    } catch (error) {
      if (!error.userCancelled) {
        console.error('Purchase failed:', error);
        Alert.alert('Error', 'Purchase failed: ' + error.message);
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setPurchasing(true);
      const customerInfo = await Purchases.restorePurchases();
      setCustomerInfo(customerInfo);
      Alert.alert('Success', 'Purchases restored successfully!');
    } catch (error) {
      console.error('Restore failed:', error);
      Alert.alert('Error', 'Failed to restore purchases: ' + error.message);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RevenueCat In-App Purchases</Text>
      </View>

      {/* Current Subscription Info */}
      {customerInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Subscription</Text>
          {Object.keys(customerInfo.entitlements.active).length > 0 ? (
            <View style={styles.entitlementBox}>
              <Text style={styles.entitlementText}>
                Active Entitlements: {Object.keys(customerInfo.entitlements.active).join(', ')}
              </Text>
              {Object.entries(customerInfo.entitlements.active).map(([key, entitlement]) => (
                <Text key={key} style={styles.entitlementDetail}>
                  {key}: Expires {new Date(entitlement.expirationDate).toLocaleDateString()}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.noActiveText}>No active subscriptions</Text>
          )}
        </View>
      )}

      {/* Available Packages */}
      {offerings && offerings.current && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Packages</Text>
          {offerings.current.availablePackages.map((package_) => (
            <View key={package_.identifier} style={styles.packageBox}>
              <Text style={styles.packageName}>{package_.product.title}</Text>
              <Text style={styles.packageDescription}>{package_.product.description}</Text>
              <Text style={styles.price}>{package_.product.priceString}</Text>
              <TouchableOpacity
                style={[styles.button, purchasing && styles.buttonDisabled]}
                onPress={() => handlePurchase(package_)}
                disabled={purchasing}
              >
                <Text style={styles.buttonText}>
                  {purchasing ? 'Processing...' : 'Purchase'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Restore Purchases Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.restoreButton, purchasing && styles.buttonDisabled]}
          onPress={handleRestorePurchases}
          disabled={purchasing}
        >
          <Text style={styles.buttonText}>
            {purchasing ? 'Processing...' : 'Restore Purchases'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  entitlementBox: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  entitlementText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
  },
  entitlementDetail: {
    fontSize: 14,
    color: '#558b2f',
    marginTop: 5,
  },
  noActiveText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  packageBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  packageDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  restoreButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;