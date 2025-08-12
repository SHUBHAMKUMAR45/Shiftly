import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import axios from 'axios';

const categories = ['Flat', 'Plot', 'Shop', 'House'];
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];

export default function PostPropertyScreen() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    bhk: '',
    area: '',
    amenities: '',
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePicker = () => {
    // Replace with your own image picker logic
    const mockImage =
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400';
    setSelectedImages((prev) => [...prev, mockImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      Alert.alert('Login Required', 'Please sign in to post a property', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => router.push('/auth/login') },
      ]);
      return;
    }
    if (
      !formData.title ||
      !formData.price ||
      !formData.location ||
      !formData.category
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/properties`,
        { ...formData, images: selectedImages },
        // { headers: { Authorization: `Bearer ${userToken}` } }
      );
      Alert.alert('Success', 'Property posted successfully', [
        {
          text: 'OK',
          onPress: () =>
            router.push({ pathname: '/', params: { refresh: 'true' } }),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to post property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={formData.title}
          onChangeText={(text) => updateFormData('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline
          value={formData.description}
          onChangeText={(text) => updateFormData('description', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={formData.category}
          onChangeText={(text) => updateFormData('category', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => updateFormData('price', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={formData.location}
          onChangeText={(text) => updateFormData('location', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="BHK"
          value={formData.bhk}
          onChangeText={(text) => updateFormData('bhk', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Area (sq ft)"
          value={formData.area}
          onChangeText={(text) => updateFormData('area', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amenities"
          value={formData.amenities}
          onChangeText={(text) => updateFormData('amenities', text)}
        />

        {/* Images */}
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePicker}
          >
            <Camera size={20} color="#2563eb" />
            <Text style={styles.imagePickerText}>Add Image</Text>
          </TouchableOpacity>
          <ScrollView horizontal>
            {selectedImages.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => removeImage(index)}>
                <Image source={{ uri: img }} style={styles.imagePreview} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Post Property</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitText: { color: '#fff', fontSize: 16 },
  disabled: { opacity: 0.6 },
  imageSection: { marginVertical: 10 },
  imagePicker: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  imagePickerText: { marginLeft: 6, color: '#2563eb' },
  imagePreview: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
});

// app/post-property.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Alert,
//   Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Camera,
//   MapPin,
//   DollarSign,
//   Home as HomeIcon,
// } from 'lucide-react-native';
// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// const categories = ['Flat', 'Plot', 'Shop', 'House'];
// const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];

// export default function PostPropertyScreen() {
//   // const { isAuthenticated, userToken } = useAuth();
//     const { isAuthenticated} = useAuth();

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     price: '',
//     location: '',
//     bhk: '',
//     area: '',
//     amenities: '',
//   });

//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Pick images from gallery
//   const handleImagePicker = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission Denied',
//         'We need gallery access to upload images.'
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//       allowsMultipleSelection: true,
//     });

//     if (!result.canceled) {
//       const newImages = result.assets.map((asset) => asset.uri);
//       setSelectedImages((prev) => [...prev, ...newImages]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setSelectedImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const updateFormData = (key: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!isAuthenticated) {
//       Alert.alert('Login Required', 'Please sign in to post a property', [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Sign In', onPress: () => router.push('/auth/login') },
//       ]);
//       return;
//     }

//     if (
//       !formData.title ||
//       !formData.price ||
//       !formData.location ||
//       !formData.category
//     ) {
//       Alert.alert('Error', 'Please fill all required fields.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await axios.post(
//         `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/properties`,
//         { ...formData, images: selectedImages },
//         // { headers: { Authorization: `Bearer ${userToken}` } }
//       );

//       Alert.alert('Success', 'Property posted successfully', [
//         // { text: 'OK', onPress: () => router.back() },
//         { text: 'OK', onPress: () => router.push('/') },
//       ]);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to post property');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Title */}
//         <Text style={styles.label}>Title *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter property title"
//           value={formData.title}
//           onChangeText={(text) => updateFormData('title', text)}
//         />

//         {/* Description */}
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           style={[styles.input, styles.multiline]}
//           placeholder="Describe your property"
//           value={formData.description}
//           onChangeText={(text) => updateFormData('description', text)}
//           multiline
//           numberOfLines={4}
//         />

//         {/* Category */}
//         <Text style={styles.label}>Category *</Text>
//         <View style={styles.optionRow}>
//           {categories.map((cat) => (
//             <TouchableOpacity
//               key={cat}
//               style={[
//                 styles.optionButton,
//                 formData.category === cat && styles.optionSelected,
//               ]}
//               onPress={() => updateFormData('category', cat)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   formData.category === cat && styles.optionTextSelected,
//                 ]}
//               >
//                 {cat}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Price */}
//         <Text style={styles.label}>Price *</Text>
//         <View style={styles.iconInput}>
//           <DollarSign size={18} color="#6b7280" />
//           <TextInput
//             style={styles.iconTextInput}
//             placeholder="Enter price"
//             keyboardType="numeric"
//             value={formData.price}
//             onChangeText={(text) => updateFormData('price', text)}
//           />
//         </View>

//         {/* Location */}
//         <Text style={styles.label}>Location *</Text>
//         <View style={styles.iconInput}>
//           <MapPin size={18} color="#6b7280" />
//           <TextInput
//             style={styles.iconTextInput}
//             placeholder="Enter location"
//             value={formData.location}
//             onChangeText={(text) => updateFormData('location', text)}
//           />
//         </View>

//         {/* BHK */}
//         <Text style={styles.label}>BHK</Text>
//         <View style={styles.optionRow}>
//           {bhkOptions.map((bhk) => (
//             <TouchableOpacity
//               key={bhk}
//               style={[
//                 styles.optionButton,
//                 formData.bhk === bhk && styles.optionSelected,
//               ]}
//               onPress={() => updateFormData('bhk', bhk)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   formData.bhk === bhk && styles.optionTextSelected,
//                 ]}
//               >
//                 {bhk}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Area */}
//         <Text style={styles.label}>Area (sq ft)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter area"
//           keyboardType="numeric"
//           value={formData.area}
//           onChangeText={(text) => updateFormData('area', text)}
//         />

//         {/* Amenities */}
//         <Text style={styles.label}>Amenities</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Comma separated amenities"
//           value={formData.amenities}
//           onChangeText={(text) => updateFormData('amenities', text)}
//         />

//         {/* Images */}
//         <Text style={styles.label}>Images</Text>
//         <View style={styles.imageContainer}>
//           {selectedImages.map((uri, index) => (
//             <View key={index} style={styles.imageWrapper}>
//               <Image source={{ uri }} style={styles.image} />
//               <TouchableOpacity
//                 style={styles.removeImage}
//                 onPress={() => removeImage(index)}
//               >
//                 <Text style={styles.removeImageText}>×</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <TouchableOpacity
//             style={styles.addImageButton}
//             onPress={handleImagePicker}
//           >
//             <Camera size={30} color="#6b7280" />
//             <Text style={styles.addImageText}>Add Image</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Submit */}
//         <TouchableOpacity
//           style={[styles.submitButton, isLoading && styles.disabled]}
//           onPress={handleSubmit}
//           disabled={isLoading}
//         >
//           <Text style={styles.submitText}>
//             {isLoading ? 'Posting...' : 'Post Property'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   content: { padding: 16 },
//   label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 12 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 14,
//   },
//   multiline: { height: 100, textAlignVertical: 'top' },
//   optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
//   optionButton: {
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginVertical: 4,
//   },
//   optionSelected: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
//   optionText: { fontSize: 14, color: '#374151' },
//   optionTextSelected: { color: '#fff' },
//   iconInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   iconTextInput: { flex: 1, padding: 10, fontSize: 14 },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginTop: 8,
//   },
//   imageWrapper: { position: 'relative' },
//   image: { width: 80, height: 80, borderRadius: 8 },
//   removeImage: {
//     position: 'absolute',
//     top: -6,
//     right: -6,
//     backgroundColor: '#ef4444',
//     borderRadius: 10,
//     paddingHorizontal: 4,
//   },
//   removeImageText: { color: '#fff', fontWeight: 'bold' },
//   addImageButton: {
//     width: 80,
//     height: 80,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addImageText: { fontSize: 12, color: '#6b7280', marginTop: 4 },
//   submitButton: {
//     backgroundColor: '#2563eb',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   submitText: { color: '#fff', fontSize: 16 },
//   disabled: { opacity: 0.6 },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Alert,
//   Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Camera, MapPin, DollarSign, Chrome as Home } from 'lucide-react-native';
// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';

// const categories = ['Flat', 'Plot', 'Shop', 'House'];
// const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];

// export default function PostPropertyScreen() {
//   const { isAuthenticated } = useAuth();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     price: '',
//     location: '',
//     bhk: '',
//     area: '',
//     amenities: '',
//   });
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleImagePicker = () => {
//     // Mock image selection
//     const mockImage = 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400';
//     setSelectedImages(prev => [...prev, mockImage]);
//   };

//   const removeImage = (index: number) => {
//     setSelectedImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const updateFormData = (key: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!isAuthenticated) {
//       Alert.alert(
//         'Authentication Required',
//         'Please sign in to post a property',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Sign In', onPress: () => router.push('/auth/login') }
//         ]
//       );
//       return;
//     }

//     if (!formData.title || !formData.price || !formData.location || !formData.category) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Mock API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       Alert.alert(
//         'Success!',
//         'Your property has been posted successfully',
//         [{ text: 'OK', onPress: () => router.back() }]
//       );
//     } catch (error) {
//       Alert.alert('Error', 'Failed to post property. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Post Property</Text>
//         <Text style={styles.headerSubtitle}>Share your property with thousands</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Basic Information */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Basic Information</Text>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Property Title *</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g., Modern 3BHK Apartment"
//               value={formData.title}
//               onChangeText={(text) => updateFormData('title', text)}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Description</Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               placeholder="Describe your property..."
//               value={formData.description}
//               onChangeText={(text) => updateFormData('description', text)}
//               multiline
//               numberOfLines={4}
//             />
//           </View>
//         </View>

//         {/* Category Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Category *</Text>
//           <View style={styles.categoryGrid}>
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category}
//                 style={[
//                   styles.categoryChip,
//                   formData.category === category && styles.selectedChip,
//                 ]}
//                 onPress={() => updateFormData('category', category)}
//               >
//                 <Home size={20} color={formData.category === category ? '#ffffff' : '#6b7280'} />
//                 <Text
//                   style={[
//                     styles.categoryText,
//                     formData.category === category && styles.selectedText,
//                   ]}
//                 >
//                   {category}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Property Details */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Property Details</Text>

//           <View style={styles.row}>
//             <View style={[styles.inputGroup, { flex: 1 }]}>
//               <Text style={styles.label}>Price *</Text>
//               <View style={styles.inputWithIcon}>
//                 <DollarSign size={20} color="#6b7280" />
//                 <TextInput
//                   style={[styles.input, styles.inputWithIconText]}
//                   placeholder="Enter price"
//                   value={formData.price}
//                   onChangeText={(text) => updateFormData('price', text)}
//                   keyboardType="numeric"
//                 />
//               </View>
//             </View>

//             <View style={[styles.inputGroup, { flex: 1 }]}>
//               <Text style={styles.label}>Area (sq ft)</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="1200"
//                 value={formData.area}
//                 onChangeText={(text) => updateFormData('area', text)}
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>BHK</Text>
//             <View style={styles.bhkGrid}>
//               {bhkOptions.map((bhk) => (
//                 <TouchableOpacity
//                   key={bhk}
//                   style={[
//                     styles.bhkChip,
//                     formData.bhk === bhk && styles.selectedChip,
//                   ]}
//                   onPress={() => updateFormData('bhk', bhk)}
//                 >
//                   <Text
//                     style={[
//                       styles.bhkText,
//                       formData.bhk === bhk && styles.selectedText,
//                     ]}
//                   >
//                     {bhk}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* Location */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Location *</Text>
//           <View style={styles.inputWithIcon}>
//             <MapPin size={20} color="#6b7280" />
//             <TextInput
//               style={[styles.input, styles.inputWithIconText]}
//               placeholder="e.g., Sector 62, Noida"
//               value={formData.location}
//               onChangeText={(text) => updateFormData('location', text)}
//             />
//           </View>
//         </View>

//         {/* Images */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Property Images</Text>

//           <TouchableOpacity style={styles.imageUploader} onPress={handleImagePicker}>
//             <Camera size={32} color="#6b7280" />
//             <Text style={styles.imageUploaderText}>Add Photos</Text>
//             <Text style={styles.imageUploaderSubtext}>
//               Add up to 10 photos of your property
//             </Text>
//           </TouchableOpacity>

//           {selectedImages.length > 0 && (
//             <View style={styles.imageGrid}>
//               {selectedImages.map((image, index) => (
//                 <View key={index} style={styles.imageItem}>
//                   <Image source={{ uri: image }} style={styles.uploadedImage} />
//                   <TouchableOpacity
//                     style={styles.removeImageButton}
//                     onPress={() => removeImage(index)}
//                   >
//                     <Text style={styles.removeImageText}>×</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Amenities */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Amenities</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="e.g., Swimming pool, Gym, Parking, Security..."
//             value={formData.amenities}
//             onChangeText={(text) => updateFormData('amenities', text)}
//             multiline
//             numberOfLines={3}
//           />
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
//           onPress={handleSubmit}
//           disabled={isLoading}
//         >
//           <Text style={styles.submitButtonText}>
//             {isLoading ? 'Posting Property...' : 'Post Property'}
//           </Text>
//         </TouchableOpacity>
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
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 20,
//     paddingVertical: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   content: {
//     flex: 1,
//   },
//   section: {
//     backgroundColor: '#ffffff',
//     marginHorizontal: 20,
//     marginTop: 16,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: '#1f2937',
//     backgroundColor: '#f9fafb',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     backgroundColor: '#f9fafb',
//   },
//   inputWithIconText: {
//     flex: 1,
//     borderWidth: 0,
//     backgroundColor: 'transparent',
//     paddingHorizontal: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   categoryChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     backgroundColor: '#f9fafb',
//     gap: 8,
//   },
//   selectedChip: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6b7280',
//   },
//   selectedText: {
//     color: '#ffffff',
//   },
//   bhkGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   bhkChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     backgroundColor: '#f9fafb',
//   },
//   bhkText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6b7280',
//   },
//   imageUploader: {
//     borderWidth: 2,
//     borderColor: '#e5e7eb',
//     borderStyle: 'dashed',
//     borderRadius: 12,
//     paddingVertical: 40,
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     marginBottom: 16,
//   },
//   imageUploaderText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//     marginTop: 8,
//   },
//   imageUploaderSubtext: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   imageItem: {
//     position: 'relative',
//   },
//   uploadedImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   removeImageButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: '#ef4444',
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   removeImageText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#2563eb',
//     marginHorizontal: 20,
//     marginVertical: 20,
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   submitButtonDisabled: {
//     opacity: 0.6,
//   },
//   submitButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
