// import React, { useState } from 'react';
// import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';

// const PaymentScreen = () => {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);

//   const fetchPaymentIntent = async () => {
//     try {
//       setLoading(true);
//       // Call your backend to create a PaymentIntent
//       const response = await fetch('https://your-backend.com/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: 5000, currency: 'usd' }) // Adjust amount & currency
//       });
//       const { paymentIntent, ephemeralKey, customer, publishableKey } = await response.json();
      
//       // Initialize Payment Sheet
//       const { error } = await initPaymentSheet({
//         merchantDisplayName: "Your App Name",
//         paymentIntentClientSecret: paymentIntent,
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         allowsDelayedPaymentMethods: true
//       });

//       if (!error) {
//         presentPaymentSheetHandler();
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const presentPaymentSheetHandler = async () => {
//     const { error } = await presentPaymentSheet();
//     if (error) {
//       Alert.alert("Payment Failed", error.message);
//     } else {
//       Alert.alert("Success", "Your payment was successful!");
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>Select Your Plan</Text>
//       {loading ? <ActivityIndicator size="large" color="blue" /> : (
//         <Button title="Pay Now" onPress={fetchPaymentIntent} />
//       )}
//     </View>
//   );
// };

// export default PaymentScreen;
