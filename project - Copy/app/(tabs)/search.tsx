import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const trendingSearches = [
  '3 BHK in Noida',
  'Apartments in Gurgaon',
  'Villas in Delhi',
  'PG in Sector 62',
  'Office space in Connaught Place',
];

const recentSearches = [
  '2 BHK under 50 Lacs',
  'Furnished apartment',
  'Properties near metro',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/property-listing',
        params: { query: searchQuery }
      });
    }
  };

  const handleTrendingSearch = (query: string) => {
    setSearchQuery(query);
    router.push({
      pathname: '/property-listing',
      params: { query }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for properties, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus
            returnKeyType="search"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Filter Panel */}
        {showFilters && (
          <View style={styles.filterPanel}>
            <Text style={styles.filterTitle}>Filters</Text>
            
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Property Type</Text>
              <View style={styles.filterOptions}>
                {['Buy', 'Rent'].map((type) => (
                  <TouchableOpacity key={type} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Category</Text>
              <View style={styles.filterOptions}>
                {['Flat', 'Plot', 'Shop'].map((category) => (
                  <TouchableOpacity key={category} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>BHK</Text>
              <View style={styles.filterOptions}>
                {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                  <TouchableOpacity key={bhk} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{bhk}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Trending Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Searches</Text>
          <View style={styles.searchList}>
            {trendingSearches.map((search, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.searchItem}
                onPress={() => handleTrendingSearch(search)}
              >
                <Search size={16} color="#6b7280" />
                <Text style={styles.searchItemText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.searchList}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.searchItem}
                onPress={() => handleTrendingSearch(search)}
              >
                <Search size={16} color="#6b7280" />
                <Text style={styles.searchItemText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Filters</Text>
          <View style={styles.quickFilters}>
            {[
              'Under 50 Lacs',
              'Ready to Move',
              'Furnished',
              'Near Metro',
              'New Projects',
              'Verified Properties'
            ].map((filter, index) => (
              <TouchableOpacity key={index} style={styles.quickFilterChip}>
                <Text style={styles.quickFilterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  filterPanel: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  filterRow: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  searchList: {
    gap: 12,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchItemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  quickFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickFilterChip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickFilterText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
});