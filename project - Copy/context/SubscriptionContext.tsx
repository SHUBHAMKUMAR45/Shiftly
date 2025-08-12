import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  messageLimit: number;
  features: string[];
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  messagesUsed: number;
  canSendMessage: boolean;
  subscribeToPlan: (planId: string) => void;
  incrementMessageCount: () => void;
  resetMessageCount: () => void;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    messageLimit: 5,
    features: ['5 messages total', 'Basic support']
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    messageLimit: 50,
    features: ['50 messages/month', 'Email support', 'Property alerts']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    messageLimit: -1, // Unlimited
    features: ['Unlimited messages', 'Priority support', 'Advanced filters']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 25,
    messageLimit: -1, // Unlimited
    features: ['Unlimited messages', 'Priority support', 'Dedicated manager']
  }
];

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(plans[0]); // Free plan by default
  const [messagesUsed, setMessagesUsed] = useState(0);

  const subscribeToPlan = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setCurrentPlan(plan);
      setMessagesUsed(0); // Reset message count on plan change
      await AsyncStorage.setItem('currentPlan', JSON.stringify(plan));
      await AsyncStorage.setItem('messagesUsed', '0');
    }
  };

  const incrementMessageCount = async () => {
    const newCount = messagesUsed + 1;
    setMessagesUsed(newCount);
    await AsyncStorage.setItem('messagesUsed', newCount.toString());
  };

  const resetMessageCount = async () => {
    setMessagesUsed(0);
    await AsyncStorage.setItem('messagesUsed', '0');
  };

  const canSendMessage = currentPlan?.messageLimit === -1 || messagesUsed < (currentPlan?.messageLimit || 0);

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        messagesUsed,
        canSendMessage,
        subscribeToPlan,
        incrementMessageCount,
        resetMessageCount,
      }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

export { plans };