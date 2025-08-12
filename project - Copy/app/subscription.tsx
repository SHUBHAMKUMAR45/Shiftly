import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Crown, Zap, Users } from 'lucide-react-native';
import { useSubscription, plans } from '@/context/SubscriptionContext';
import { router } from 'expo-router';

export default function SubscriptionScreen() {
  const { currentPlan, messagesUsed, subscribeToPlan } = useSubscription();

  const handleSubscribe = (planId: string) => {
    subscribeToPlan(planId);
    Alert.alert(
      'Success!',
      `You've successfully subscribed to the ${plans.find(p => p.id === planId)?.name} plan`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic':
        return <Zap size={24} color="#fbbf24" />;
      case 'pro':
        return <Crown size={24} color="#8b5cf6" />;
      case 'enterprise':
        return <Users size={24} color="#10b981" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Current Plan Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Current Plan</Text>
          <Text style={styles.currentPlanName}>{currentPlan?.name}</Text>
          <Text style={styles.messagesStatus}>
            {currentPlan?.messageLimit === -1 
              ? 'Unlimited messages' 
              : `${messagesUsed}/${currentPlan?.messageLimit} messages used`
            }
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.slice(1).map((plan) => (
            <View 
              key={plan.id} 
              style={[
                styles.planCard,
                currentPlan?.id === plan.id && styles.currentPlanCard
              ]}
            >
              <View style={styles.planHeader}>
                <View style={styles.planIconContainer}>
                  {getPlanIcon(plan.id)}
                </View>
                <View style={styles.planTitleContainer}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPrice}>
                    ${plan.price}/month
                  </Text>
                </View>
                {currentPlan?.id === plan.id && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.feature}>
                    <Check size={16} color="#10b981" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {currentPlan?.id !== plan.id && (
                <TouchableOpacity
                  style={[
                    styles.subscribeButton,
                    plan.id === 'pro' && styles.popularButton
                  ]}
                  onPress={() => handleSubscribe(plan.id)}
                >
                  <Text style={[
                    styles.subscribeButtonText,
                    plan.id === 'pro' && styles.popularButtonText
                  ]}>
                    Subscribe to {plan.name}
                  </Text>
                </TouchableOpacity>
              )}

              {plan.id === 'pro' && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Features Comparison */}
        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonTitle}>Why Upgrade?</Text>
          <View style={styles.comparisonList}>
            <View style={styles.comparisonItem}>
              <Check size={16} color="#10b981" />
              <Text style={styles.comparisonText}>
                Send unlimited messages to property agents
              </Text>
            </View>
            <View style={styles.comparisonItem}>
              <Check size={16} color="#10b981" />
              <Text style={styles.comparisonText}>
                Get priority support and faster responses
              </Text>
            </View>
            <View style={styles.comparisonItem}>
              <Check size={16} color="#10b981" />
              <Text style={styles.comparisonText}>
                Access to exclusive property listings
              </Text>
            </View>
            <View style={styles.comparisonItem}>
              <Check size={16} color="#10b981" />
              <Text style={styles.comparisonText}>
                Advanced property filtering options
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            * This is a demo app. No real payments will be processed.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  currentPlanName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  messagesStatus: {
    fontSize: 14,
    color: '#6b7280',
  },
  plansContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  currentPlanCard: {
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planIconContainer: {
    marginRight: 12,
  },
  planTitleContainer: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  planPrice: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  currentBadge: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  currentBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 20,
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#2563eb',
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  popularButtonText: {
    color: '#ffffff',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  comparisonCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  comparisonList: {
    gap: 12,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  comparisonText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  disclaimer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});