// app/index.tsx (DashboardScreen)
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  Bell,
  Search,
  Filter,
  MapPin,
  Heart,
  PlusCircle,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

const cityCards = [
  {
    id: '1',
    name: 'Delhi',
    properties: '1,200+ Properties',
    image:
      'https://images.pexels.com/photos/789382/pexels-photo-789382.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Noida',
    properties: '800+ Properties',
    image:
      'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Gurgaon',
    properties: '950+ Properties',
    image:
      'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Faridabad',
    properties: '600+ Properties',
    image:
      'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const dummyProperties = [
  {
    id: '1',
    title: 'Modern Apartment',
    location: 'Sector 62, Noida',
    price: '₹45,00,000',
    image:
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
    tag: 'Trending',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Luxury Villa',
    location: 'Golf Course Road, Gurgaon',
    price: '₹1,20,00,000',
    image:
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
    tag: 'Verified',
    isFavorite: false,
  },
];

export default function DashboardScreen() {
  const { user, isAuthenticated } = useAuth();

  const handlePostPropertyPress = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      router.push('/post-property');
    }
  };

  const renderCityCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.cityCard}>
      <Image source={{ uri: item.image }} style={styles.cityImage} />
      <View style={styles.cityOverlay}>
        <Text style={styles.cityName}>{item.name}</Text>
        <Text style={styles.cityProperties}>{item.properties}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPropertyCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyTag}>
        <Text style={styles.propertyTagText}>{item.tag}</Text>
      </View>
      <TouchableOpacity style={styles.heartIcon}>
        <Heart
          size={20}
          color={item.isFavorite ? '#ef4444' : '#ffffff'}
          fill={item.isFavorite ? '#ef4444' : 'transparent'}
        />
      </TouchableOpacity>
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.propertyLocation}>{item.location}</Text>
        </View>
        <Text style={styles.propertyPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.appName}>Shifly</Text>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Bell size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.firstName || 'Guest'}!
          </Text>
          <Text style={styles.welcomeSubtext}>
            Find your dream property today
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6b7280" />
            <Text style={styles.searchPlaceholder}>
              Search for properties, locations...
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Post Property Button */}
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePostPropertyPress}
        >
          <PlusCircle size={20} color="#fff" />
          <Text style={styles.postButtonText}>Post a Property</Text>
        </TouchableOpacity>

        {/* Cities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Cities</Text>
          <FlatList
            data={cityCards}
            renderItem={renderCityCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cityList}
          />
        </View>

        {/* Trending Properties */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Properties</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyProperties}
            renderItem={renderPropertyCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertyList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  appName: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  content: { flex: 1 },
  welcomeSection: { padding: 16 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  welcomeSubtext: { fontSize: 14, color: '#6b7280' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: { color: '#6b7280', fontSize: 14, marginLeft: 8 },
  filterButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
  },
  postButtonText: { color: '#fff', marginLeft: 8 },
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  viewAllText: { color: '#2563eb', fontWeight: '600' },
  cityList: { paddingHorizontal: 16, gap: 12 },
  cityCard: { width: 140, height: 100, borderRadius: 12, overflow: 'hidden' },
  cityImage: { width: '100%', height: '100%' },
  cityOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
  },
  cityName: { color: '#fff', fontWeight: '600' },
  cityProperties: { color: '#ddd', fontSize: 12 },
  propertyList: { paddingHorizontal: 16, gap: 12 },
  propertyCard: {
    width: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  propertyImage: { width: '100%', height: 120 },
  propertyTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  propertyTagText: { color: '#fff', fontSize: 12 },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 6,
    borderRadius: 20,
  },
  propertyInfo: { padding: 8 },
  propertyTitle: { fontSize: 14, fontWeight: '600' },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  propertyLocation: { marginLeft: 4, color: '#6b7280', fontSize: 12 },
  propertyPrice: { fontWeight: '700', color: '#16a34a' },
});

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Menu, Bell, MapPin, Heart, PlusCircle } from 'lucide-react-native';
// import { useAuth } from '@/context/AuthContext';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import axios from 'axios';

// export default function DashboardScreen() {
//   const { user, isAuthenticated } = useAuth();
//   const { refresh } = useLocalSearchParams();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProperties = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/properties`
//       );
//       setProperties(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchProperties();
//     }, [refresh])
//   );

//   const handlePostPropertyPress = () => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//     } else {
//       router.push('/post-property');
//     }
//   };

//   const renderPropertyCard = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.propertyCard}
//       // onPress={() => router.push(`/property/${item.id}`)}
//     >
//       <Image source={{ uri: item.images?.[0] }} style={styles.propertyImage} />
//       <View style={styles.propertyInfo}>
//         <Text style={styles.propertyTitle}>{item.title}</Text>
//         <View style={styles.locationContainer}>
//           <MapPin size={14} color="#6b7280" />
//           <Text style={styles.propertyLocation}>{item.location}</Text>
//         </View>
//         <Text style={styles.propertyPrice}>₹{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Menu size={24} color="#1f2937" />
//         </TouchableOpacity>
//         <Text style={styles.appName}>Shifly</Text>
//         {/* <TouchableOpacity onPress={() => router.push('/notifications')}>
//           <Bell size={24} color="#1f2937" />
//         </TouchableOpacity> */}
//       </View>

//       <ScrollView style={styles.content}>
//         <View style={styles.welcomeSection}>
//           <Text style={styles.welcomeText}>
//             Welcome back, {user?.firstName || 'Guest'}!
//           </Text>
//           <Text style={styles.welcomeSubtext}>
//             Find your dream property today
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.postButton}
//           onPress={handlePostPropertyPress}
//         >
//           <PlusCircle size={20} color="#fff" />
//           <Text style={styles.postButtonText}>Post a Property</Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Latest Properties</Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#2563eb" />
//         ) : (
//           <FlatList
//             data={properties}
//             renderItem={renderPropertyCard}
//             keyExtractor={(item) => item.id.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   content: { padding: 16 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   appName: { fontSize: 20, fontWeight: 'bold' },
//   welcomeSection: { marginBottom: 16 },
//   welcomeText: { fontSize: 18, fontWeight: 'bold' },
//   welcomeSubtext: { color: '#6b7280' },
//   postButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2563eb',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   postButtonText: { color: '#fff', marginLeft: 8 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
//   propertyCard: { width: 200, marginRight: 16 },
//   propertyImage: { width: '100%', height: 120, borderRadius: 8 },
//   propertyInfo: { paddingVertical: 6 },
//   propertyTitle: { fontSize: 16, fontWeight: 'bold' },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   propertyLocation: { marginLeft: 4, color: '#6b7280' },
//   propertyPrice: { fontSize: 16, color: '#2563eb', fontWeight: 'bold' },
// });

// // // app/index.tsx (DashboardScreen)
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Menu,
//   Bell,
//   Search,
//   Filter,
//   MapPin,
//   Heart,
//   PlusCircle,
// } from 'lucide-react-native';
// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';

// const cityCards = [
//   {
//     id: '1',
//     name: 'Delhi',
//     properties: '1,200+ Properties',
//     image:
//       'https://images.pexels.com/photos/789382/pexels-photo-789382.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//   {
//     id: '2',
//     name: 'Noida',
//     properties: '800+ Properties',
//     image:
//       'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//   {
//     id: '3',
//     name: 'Gurgaon',
//     properties: '950+ Properties',
//     image:
//       'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//   {
//     id: '4',
//     name: 'Faridabad',
//     properties: '950+ Properties',
//     image:
//       'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
// ];

// const trendingProperties = [
//   {
//     id: '1',
//     title: 'Modern Apartment',
//     location: 'Sector 62, Noida',
//     price: '₹45,00,000',
//     image:
//       'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
//     tag: 'Trending',
//     isFavorite: true,
//   },
//   {
//     id: '2',
//     title: 'Luxury Villa',
//     location: 'Golf Course Road, Gurgaon',
//     price: '₹1,20,00,000',
//     image:
//       'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
//     tag: 'Verified',
//     isFavorite: true,
//   },
// ];

// export default function DashboardScreen() {
//   const { user, isAuthenticated } = useAuth();

//   const handlePostPropertyPress = () => {
//     if (!isAuthenticated) {
//       router.push('/auth/login'); // Redirect to login if not logged in
//     } else {
//       router.push('/post-property'); // Go to post property if logged in
//     }
//   };

//   const renderCityCard = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.cityCard}>
//       <Image source={{ uri: item.image }} style={styles.cityImage} />
//       <View style={styles.cityOverlay}>
//         <Text style={styles.cityName}>{item.name}</Text>
//         <Text style={styles.cityProperties}>{item.properties}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPropertyCard = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.propertyCard}
//       onPress={() => router.push(`/property/${item.id}`)}
//     >
//       <Image source={{ uri: item.image }} style={styles.propertyImage} />
//       <View style={styles.propertyTag}>
//         <Text style={styles.propertyTagText}>{item.tag}</Text>
//       </View>
//       <TouchableOpacity style={styles.heartIcon}>
//         <Heart
//           size={20}
//           color={item.isFavorite ? '#ef4444' : '#ffffff'}
//           fill={item.isFavorite ? '#ef4444' : 'transparent'}
//         />
//       </TouchableOpacity>
//       <View style={styles.propertyInfo}>
//         <Text style={styles.propertyTitle}>{item.title}</Text>
//         <View style={styles.locationContainer}>
//           <MapPin size={14} color="#6b7280" />
//           <Text style={styles.propertyLocation}>{item.location}</Text>
//         </View>
//         <Text style={styles.propertyPrice}>{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Menu size={24} color="#1f2937" />
//         </TouchableOpacity>
//         <Text style={styles.appName}>Shifly</Text>
//         <TouchableOpacity onPress={() => router.push('/notifications')}>
//           <Bell size={24} color="#1f2937" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.welcomeSection}>
//           <Text style={styles.welcomeText}>
//             Welcome back, {user?.firstName || 'Guest'}!
//           </Text>
//           <Text style={styles.welcomeSubtext}>
//             Find your dream property today
//           </Text>
//         </View>

//         {/* Post Property Button */}
//         <TouchableOpacity
//           style={styles.postButton}
//           onPress={handlePostPropertyPress}
//         >
//           <PlusCircle size={20} color="#fff" />
//           <Text style={styles.postButtonText}>Post a Property</Text>
//         </TouchableOpacity>

//         {/* Cities */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Explore Cities</Text>
//           <FlatList
//             data={cityCards}
//             renderItem={renderCityCard}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.cityList}
//           />
//         </View>

//         {/* Trending */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Trending Properties</Text>
//           <FlatList
//             data={trendingProperties}
//             renderItem={renderPropertyCard}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.propertyList}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   appName: { fontSize: 20, fontWeight: 'bold' },
//   welcomeSection: { padding: 16 },
//   welcomeText: { fontSize: 18, fontWeight: '600' },
//   welcomeSubtext: { fontSize: 14, color: '#6b7280' },
//   postButton: {
//     flexDirection: 'row',
//     backgroundColor: '#2563eb',
//     padding: 12,
//     margin: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   postButtonText: { color: '#fff', fontSize: 16, marginLeft: 8 },
//   section: { padding: 16 },
//   sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
//   cityCard: { marginRight: 12, borderRadius: 8, overflow: 'hidden' },
//   cityImage: { width: 140, height: 100 },
//   cityOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     padding: 6,
//     width: '100%',
//   },
//   cityName: { color: '#fff', fontWeight: '600' },
//   cityProperties: { color: '#ddd', fontSize: 12 },
//   propertyCard: {
//     marginRight: 12,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     width: 200,
//   },
//   propertyImage: { width: '100%', height: 120 },
//   propertyTag: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#2563eb',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   propertyTagText: { color: '#fff', fontSize: 12 },
//   heartIcon: { position: 'absolute', top: 8, right: 8 },
//   propertyInfo: { padding: 8 },
//   propertyTitle: { fontWeight: '600', fontSize: 14 },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   propertyLocation: { marginLeft: 4, color: '#6b7280', fontSize: 12 },
//   propertyPrice: { fontWeight: '700', color: '#16a34a' },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Image,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Menu, Bell, Search, Filter, MapPin, Heart } from 'lucide-react-native';
// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';

// const cityCards = [
//   {
//     id: '1',
//     name: 'Delhi',
//     properties: '1,200+ Properties',
//     image: 'https://images.pexels.com/photos/789382/pexels-photo-789382.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//   {
//     id: '2',
//     name: 'Noida',
//     properties: '800+ Properties',
//     image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//   {
//     id: '3',
//     name: 'Gurgaon',
//     properties: '950+ Properties',
//     image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
//     {
//     id: '4',
//     name: 'Faridabad',
//     properties: '950+ Properties',
//     image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400',
//   },
// ];

// const trendingProperties = [
//   {
//     id: '1',
//     title: 'Modern Apartment',
//     location: 'Sector 62, Noida',
//     price: '₹45,00,000',
//     image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
//     tag: 'Trending',
//     isFavorite: true,
//   },
//   {
//     id: '2',
//     title: 'Luxury Villa',
//     location: 'Golf Course Road, Gurgaon',
//     price: '₹1,20,00,000',
//     image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
//     tag: 'Verified',
//     isFavorite: true,
//   },
// ];

// export default function DashboardScreen() {
//   const [activeTab, setActiveTab] = useState('Buy');
//   const [searchQuery, setSearchQuery] = useState('');
//   const { user, isAuthenticated } = useAuth();

//   const handleSearch = () => {
//     router.push('/search');
//   };

//   const renderCityCard = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.cityCard}>
//       <Image source={{ uri: item.image }} style={styles.cityImage} />
//       <View style={styles.cityOverlay}>
//         <Text style={styles.cityName}>{item.name}</Text>
//         <Text style={styles.cityProperties}>{item.properties}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPropertyCard = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.propertyCard}
//       onPress={() => router.push(`/property/${item.id}`)}
//     >
//       <Image source={{ uri: item.image }} style={styles.propertyImage} />
//       <View style={styles.propertyTag}>
//         <Text style={styles.propertyTagText}>{item.tag}</Text>
//       </View>
//       <TouchableOpacity style={styles.heartIcon}>
//         <Heart
//           size={20}
//           color={item.isFavorite ? "#ef4444" : "#ffffff"}
//           fill={item.isFavorite ? "#ef4444" : "transparent"}
//         />
//       </TouchableOpacity>
//       <View style={styles.propertyInfo}>
//         <Text style={styles.propertyTitle}>{item.title}</Text>
//         <View style={styles.locationContainer}>
//           <MapPin size={14} color="#6b7280" />
//           <Text style={styles.propertyLocation}>{item.location}</Text>
//         </View>
//         <Text style={styles.propertyPrice}>{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // if (!isAuthenticated) {
//   //   return (
//   //     <SafeAreaView style={styles.container}>
//   //       <View style={styles.authPrompt}>
//   //         <Text style={styles.authPromptTitle}>Welcome to Shifly</Text>
//   //         <Text style={styles.authPromptSubtitle}>
//   //           Please sign in to access all features
//   //         </Text>
//   //         <TouchableOpacity
//   //           style={styles.authButton}
//   //           onPress={() => router.push('/auth/login')}
//   //         >
//   //           <Text style={styles.authButtonText}>Sign In</Text>
//   //         </TouchableOpacity>
//   //       </View>
//   //     </SafeAreaView>
//   //   );
//   // }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Custom Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => {/* Open drawer */}}>
//           <Menu size={24} color="#1f2937" />
//         </TouchableOpacity>

//         <Text style={styles.appName}>Shifly</Text>

//         <TouchableOpacity onPress={() => router.push('/notifications')}>
//           <Bell size={24} color="#1f2937" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Welcome Section */}
//         <View style={styles.welcomeSection}>
//           <Text style={styles.welcomeText}>
//             Welcome back, {user?.firstName}!
//           </Text>
//           <Text style={styles.welcomeSubtext}>
//             Find your dream property today
//           </Text>
//         </View>

//         {/* Search Bar */}
//         <TouchableOpacity style={styles.searchContainer} onPress={handleSearch}>
//           <View style={styles.searchBar}>
//             <Search size={20} color="#6b7280" />
//             <Text style={styles.searchPlaceholder}>
//               Search for properties, locations...
//             </Text>
//           </View>
//           <TouchableOpacity style={styles.filterButton}>
//             <Filter size={20} color="#ffffff" />
//           </TouchableOpacity>
//         </TouchableOpacity>

//         {/* City Cards */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Explore Cities</Text>
//           <FlatList
//             data={cityCards}
//             renderItem={renderCityCard}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.cityList}
//           />
//         </View>

//         {/* Trending Properties */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Trending Properties</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={trendingProperties}
//             renderItem={renderPropertyCard}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.propertyList}
//           />
//         </View>

//         {/* Recommended Properties */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Recommended for You</Text>
//           <FlatList
//             data={trendingProperties}
//             renderItem={renderPropertyCard}
//             keyExtractor={(item) => `rec_${item.id}`}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.propertyList}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     fontFamily: 'system',
//   },
//   content: {
//     flex: 1,
//   },
//   welcomeSection: {
//     paddingHorizontal: 20,
//     paddingTop: 24,
//     paddingBottom: 16,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   welcomeSubtext: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 24,
//     gap: 12,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     gap: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchPlaceholder: {
//     flex: 1,
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   filterButton: {
//     backgroundColor: '#2563eb',
//     borderRadius: 12,
//     padding: 14,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 20,
//     marginBottom: 24,
//     backgroundColor: '#f3f4f6',
//     borderRadius: 12,
//     padding: 4,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   activeTabButton: {
//     backgroundColor: '#2563eb',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#6b7280',
//   },
//   activeTabText: {
//     color: '#ffffff',
//   },
//   section: {
//     marginBottom: 32,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: '#2563eb',
//     fontWeight: '600',
//   },
//   cityList: {
//     paddingLeft: 20,
//     gap: 16,
//   },
//   cityCard: {
//     width: 200,
//     height: 120,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   cityImage: {
//     width: '100%',
//     height: '100%',
//   },
//   cityOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     padding: 12,
//   },
//   cityName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 2,
//   },
//   cityProperties: {
//     fontSize: 12,
//     color: '#e5e7eb',
//   },
//   propertyList: {
//     paddingLeft: 20,
//     gap: 16,
//   },
//   propertyCard: {
//     width: 280,
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   propertyImage: {
//     width: '100%',
//     height: 160,
//   },
//   propertyTag: {
//     position: 'absolute',
//     top: 12,
//     left: 12,
//     backgroundColor: '#fbbf24',
//     borderRadius: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   propertyTagText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     borderRadius: 20,
//     padding: 8,
//   },
//   propertyInfo: {
//     padding: 16,
//   },
//   propertyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 8,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     marginBottom: 8,
//   },
//   propertyLocation: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   propertyPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2563eb',
//   },
//   authPrompt: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   authPromptTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 8,
//   },
//   authPromptSubtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   authButton: {
//     backgroundColor: '#2563eb',
//     borderRadius: 12,
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//   },
//   authButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
