import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

type Property = {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
};

export default function PropertyListScreen() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/properties`
        );
        console.log(res.data);
        if (res.data.success) {
          setProperties(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handlePropertyClick = (id: string) => {
    if (Platform.OS === 'web') {
      // ✅ On web, open in a new browser tab
      window.open(`/components/property/${id}`, '_blank');
    } else {
      // ✅ On mobile, navigate inside the app
      router.push({ pathname: '/components/property/[id]', params: { id } });
    }
  };

  if (loading) return <ActivityIndicator />;

  if (!properties.length) return <Text>No properties found.</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {properties.map((property) => (
        <TouchableOpacity
          key={property._id}
          style={{
            marginBottom: 20,
            padding: 15,
            borderWidth: 1,
            borderRadius: 8,
          }}
          onPress={() => handlePropertyClick(property._id)}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {property.title}
          </Text>
          <Text>{property.location}</Text>
          <Text>₹{property.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
