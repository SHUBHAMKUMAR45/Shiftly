import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/properties/${id}`
        );
        console.log(res.data);
        if (res.data.success) {
          setProperty(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  if (loading) return <ActivityIndicator />;
  if (!property) return <Text>Property not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{property.title}</Text>
      <Text>{property.location}</Text>
      <Text>₹{property.price}</Text>
      <Text>{property.description}</Text>
    </View>
  );
}
