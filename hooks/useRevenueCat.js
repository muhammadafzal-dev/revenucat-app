import { useEffect, useState } from 'react';
import { Purchases, PurchasesError, PurchasePackage } from 'react-native-purchases';

const useRevenueCat = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                const info = await Purchases.getCustomerInfo();
                setCustomerInfo(info);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomerInfo();
    }, []);

    const purchasePackage = async (purchasePackage) => {
        try {
            const purchaseInfo = await Purchases.purchasePackage(purchasePackage);
            setCustomerInfo(purchaseInfo.customerInfo);
            return purchaseInfo;
        } catch (e) {
            if (e instanceof PurchasesError) {
                setError(e);
            } else {
                throw e;
            }
        }
    };

    return { customerInfo, isLoading, error, purchasePackage };
};

export default useRevenueCat;