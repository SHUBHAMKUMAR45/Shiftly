import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MapPin, Share2 } from 'lucide-react-native';
import { router } from 'expo-router';

const favoriteProperties = [
  {
    id: '1',
    title: 'Modern Apartment',
    location: 'Sector 62, Noida',
    price: '₹45,00,000',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bhk: '3 BHK',
    area: '1200 sq ft',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Luxury Villa',
    location: 'Golf Course Road, Gurgaon',
    price: '₹1,20,00,000',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
    bhk: '4 BHK',
    area: '2500 sq ft',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Cozy Studio',
    location: 'Connaught Place, Delhi',
    price: '₹25,00,000',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
    bhk: '1 BHK',
    area: '450 sq ft',
    isFavorite: true,
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(favoriteProperties);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.filter(item => item.id !== id)
    );
  };

  const handleShare = (property: any) => {
    // Mock share functionality
    console.log('Sharing:', property.title);
  };

  const renderPropertyCard = ({ item }: { item: any }) => (
    <View style={styles.propertyCard}>
      <TouchableOpacity 
        onPress={() => router.push(`/property/${item.id}`)}
      >
        <Image source={{ uri: item.image }} style={styles.propertyImage} />
      </TouchableOpacity>
      
      <View style={styles.propertyActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart size={20} color="#ef4444" fill="#ef4444" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item)}
        >
          <Share2 size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>

        <View style={styles.propertyDetails}>
          <Text style={styles.propertyBhk}>{item.bhk}</Text>
          <Text style={styles.propertySeparator}>•</Text>
          <Text style={styles.propertyArea}>{item.area}</Text>
        </View>

        <Text style={styles.propertyPrice}>{item.price}</Text>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Heart size={64} color="#e5e7eb" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start browsing properties and add them to your favorites
      </Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => router.push('/(tabs)/search')}
      >
        <Text style={styles.browseButtonText}>Browse Properties</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} saved properties
        </Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  propertyActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  propertyInfo: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  propertyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  propertyBhk: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  propertySeparator: {
    fontSize: 14,
    color: '#9ca3af',
  },
  propertyArea: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});