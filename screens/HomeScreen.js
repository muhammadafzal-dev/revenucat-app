import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
    // Sample data for packages and subscriptions
    const packages = [
        { id: 1, name: 'Package A', price: '$10', subscribed: false },
        { id: 2, name: 'Package B', price: '$20', subscribed: true },
        { id: 3, name: 'Package C', price: '$30', subscribed: false },
    ];
    
    const currentSubscriptions = packages.filter(pkg => pkg.subscribed);

    const handlePurchase = (pkg) => {
        // Logic for purchasing the package goes here
        alert(`Purchased ${pkg.name}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Packages</Text>
            {packages.map(pkg => (
                <View key={pkg.id} style={styles.packageContainer}>
                    <Text>{pkg.name}</Text>
                    <Text>{pkg.price}</Text>
                    <Button
                        title="Purchase"
                        onPress={() => handlePurchase(pkg)}
                        disabled={pkg.subscribed}
                    />
                </View>
            ))}
            <Text style={styles.title}>Current Subscriptions</Text>
            {currentSubscriptions.map(pkg => (
                <Text key={pkg.id}>{pkg.name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    packageContainer: {
        marginBottom: 20,
    },
});

export default HomeScreen;
