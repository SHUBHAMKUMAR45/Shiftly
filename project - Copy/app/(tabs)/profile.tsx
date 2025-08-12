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
import { User, Settings, Heart, Chrome as Home, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const { currentPlan, messagesUsed } = useSubscription();

  // const handleLogout = () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure you want to logout?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       { 
  //         text: 'Logout', 
  //         style: 'destructive',
  //         onPress: async () => {
  //           await logout();
  //           router.replace('/auth/login');
  //         }
  //       }
  //     ]
  //   );
  // };
  const handleLogout = () => {
  // Alert.alert(
  //   'Logout',
  //   'Are you sure you want to logout?',
  //   [
  //     { text: 'Cancel', style: 'cancel' },
  //     {
  //       text: 'Logout',
  //       style: 'destructive',
  //       onPress: async () => {
  //         try {
  //           console.log("Logout button pressed");
  //           await logout();
  //           console.log("Logout completed");
  //         } catch (err) {
  //           console.error("Logout error:", err);
  //         } finally {
  //           // Always navigate to login, even if logout fails
            router.replace('/auth/login');
    //       }
    //     }
    //   }
  };
    // ]
  
// };

  const menuItems = [
    { icon: Home, title: 'My Listings', subtitle: 'Manage your properties', action: () => {} },
    { icon: Heart, title: 'Favorites', subtitle: 'Saved properties', action: () => router.push('/(tabs)/favorites') },
    { icon: Bell, title: 'Notifications', subtitle: 'App notifications', action: () => {} },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences', action: () => {} },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance', action: () => {} },
  ];

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authPrompt}>
          <User size={64} color="#e5e7eb" />
          <Text style={styles.authPromptTitle}>Sign in Required</Text>
          <Text style={styles.authPromptSubtitle}>
            Please sign in to access your profile and manage your account
          </Text>
          <TouchableOpacity 
            style={styles.authButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <User size={32} color="#2563eb" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Text style={styles.profilePhone}>{user?.phoneNumber}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Subscription Status */}
        <TouchableOpacity 
          style={styles.subscriptionCard}
          onPress={() => router.push('/subscription')}
        >
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionTitle}>Current Plan</Text>
            <Text style={styles.subscriptionPlan}>{currentPlan?.name}</Text>
            <Text style={styles.subscriptionUsage}>
              {currentPlan?.messageLimit === -1 
                ? 'Unlimited messages' 
                : `${messagesUsed}/${currentPlan?.messageLimit} messages used`
              }
            </Text>
          </View>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Listed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Viewed</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuIcon}>
                <item.icon size={20} color="#2563eb" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Shifly v1.0.0</Text>
          <Text style={styles.appDescription}>
            Your trusted real estate companion
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
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: '#6b7280',
  },
  editButton: {
    padding: 8,
  },
  subscriptionCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  subscriptionPlan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  subscriptionUsage: {
    fontSize: 12,
    color: '#6b7280',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  authPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  authPromptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  authPromptSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  authButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});