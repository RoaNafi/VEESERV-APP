import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './SignUpStyle';
import Colors from '../../Components/Colors/Colors';
import { Ionicons } from '@expo/vector-icons'; // For the eye and location icons
import * as Location from 'expo-location'; // For geolocation
import Logo from '../../assets/Logo/LogoVEESERV-Blue.png'; // Replace with your logo image path

const SignUp = ({ route, navigation }) => {
  // State for form fields
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    lat: '',
    lng: '',
  });
  const [workshop_name, setWorkshopName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Access the role parameter from the route
  const { role } = route.params;

  // Animation values for floating labels
  const firstNameAnim = useRef(new Animated.Value(0)).current;
  const lastNameAnim = useRef(new Animated.Value(0)).current;
  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const phoneNumberAnim = useRef(new Animated.Value(0)).current;
  const addressAnim = useRef(new Animated.Value(0)).current;
  const workshopNameAnim = useRef(new Animated.Value(0)).current;

  // Handle location fetch
  const handleGetLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions to fetch your address.');
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      // Fetch the address using OpenStreetMap Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      const { road, city } = data.address;

      // Update the address state
      setAddress({
        street: road || 'Unknown Street',
        city: city || 'Unknown City',
        lat: latitude.toString(),
        lng: longitude.toString(),
      });

      // Trigger the floating label animation
      handleFocus(addressAnim);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Unable to fetch your location. Please try again.');
    }
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return minLength && hasUpperCase && hasLowerCase;
  };

  // Handle sign-up (without API)
  const handleSignUp = () => {
    if (!first_name || !last_name || !email_address || !password || !phone_number || !address.street) {
      setError('Please fill in all fields.');
      return;
    }

    if (role === 'Mechanic' && !workshop_name) {
      setError('Please enter your workshop name.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, with both uppercase and lowercase letters.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a successful sign-up
    setTimeout(() => {
      setLoading(false);
      if (role === 'Mechanic') {
        navigation.navigate('WorkingHours', { role });
      } else {
        navigation.navigate('ProfilePicture', { role });
      }
    }, 1000); // Simulate a delay for loading
  };

  // Floating label styles
  const floatingLabelStyle = (anim) => ({
    position: 'absolute',
    left: 10,
    top: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A0A0A0', Colors.blue],
    }),
  });

  // Handle focus and blur for floating labels
  const handleFocus = (anim) => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (anim, value) => {
    if (!value) {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={Logo}
        style={styles.logo}
      />

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Let’s get you started!</Text>

        {/* First Name Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(firstNameAnim)}>
            First Name
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={first_name}
            onChangeText={setFirstName}
            onFocus={() => handleFocus(firstNameAnim)}
            onBlur={() => handleBlur(firstNameAnim, first_name)}
          />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(lastNameAnim)}>
            Last Name
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={last_name}
            onChangeText={setLastName}
            onFocus={() => handleFocus(lastNameAnim)}
            onBlur={() => handleBlur(lastNameAnim, last_name)}
          />
        </View>

        {/* Workshop Name Input (for Mechanics) */}
        {role === 'Mechanic' && (
          <View style={styles.inputContainer}>
            <Animated.Text style={floatingLabelStyle(workshopNameAnim)}>
              Workshop Name
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={workshop_name}
              onChangeText={setWorkshopName}
              onFocus={() => handleFocus(workshopNameAnim)}
              onBlur={() => handleBlur(workshopNameAnim, workshop_name)}
            />
          </View>
        )}

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(emailAnim)}>
            Email
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={email_address}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => handleFocus(emailAnim)}
            onBlur={() => handleBlur(emailAnim, email_address)}
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(phoneNumberAnim)}>
            Phone Number
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={phone_number}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            onFocus={() => handleFocus(phoneNumberAnim)}
            onBlur={() => handleBlur(phoneNumberAnim, phone_number)}
          />
        </View>

        {/* Address Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(addressAnim)}>
            Address
          </Animated.Text>
          <TextInput
            style={styles.addressInput}
            value={address.street ? `${address.street}, ${address.city}` : ''}
            placeholder="                   click on the icon"
            placeholderTextColor="#A0A0A0"
            editable={false}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleGetLocation}
          >
            <Ionicons name="location" size={24} color={Colors.blue} />
          </TouchableOpacity>
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={floatingLabelStyle(passwordAnim)}>
            Password
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onFocus={() => handleFocus(passwordAnim)}
            onBlur={() => handleBlur(passwordAnim, password)}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Already Have an Account Link */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate('Login')}
          >
            Log In
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;