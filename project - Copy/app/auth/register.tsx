import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    age: '',
    sex: 'M',
    tncAgreement: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phoneNumber || !formData.password || !formData.age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!formData.tncAgreement) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    const success = await register(formData);
    setIsLoading(false);

    if (success) {
      router.push('/auth/otp-verification');
    } else {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join thousands of property seekers</Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfWidth]}
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(text) => updateFormData('firstName', text)}
                placeholderTextColor="#9ca3af"
              />
              <TextInput
                style={[styles.input, styles.halfWidth]}
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) => updateFormData('lastName', text)}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => updateFormData('phoneNumber', text)}
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              secureTextEntry
              placeholderTextColor="#9ca3af"
            />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfWidth]}
                placeholder="Age"
                value={formData.age}
                onChangeText={(text) => updateFormData('age', text)}
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
              
              <View style={[styles.input, styles.halfWidth, styles.pickerContainer]}>
                <Picker
                  selectedValue={formData.sex}
                  onValueChange={(value) => updateFormData('sex', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => updateFormData('tncAgreement', !formData.tncAgreement)}
            >
              <View style={[styles.checkbox, formData.tncAgreement && styles.checkboxChecked]}>
                {formData.tncAgreement && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                I agree to the Terms and Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                (!formData.tncAgreement || isLoading) && styles.buttonDisabled
              ]}
              onPress={handleRegister}
              disabled={!formData.tncAgreement || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating Account...' : 'Register'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.linkText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  halfWidth: {
    flex: 1,
  },
  pickerContainer: {
    paddingVertical: 0,
    justifyContent: 'center',
  },
  picker: {
    color: '#1f2937',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ffffff',
  },
  checkmark: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 14,
  },
});