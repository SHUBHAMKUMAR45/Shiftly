import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { SubscriptionProvider } from '@/context/SubscriptionContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="auth/otp-verification" />
          <Stack.Screen name="property/[id]" />
          <Stack.Screen name="subscription" />
          {/* <Stack.Screen name="chat/[propertyId]" /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SubscriptionProvider>
    </AuthProvider>
  );
}