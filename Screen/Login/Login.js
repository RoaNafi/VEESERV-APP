import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styles from './LoginStyle';
import Colors from '../../Components/Colors/Colors'; // Import your color palette
import UserTypeSelection from '../RoleSelection/RoleSelection'; // Import the UserTypeSelection modal
import Logo from '../../assets/Logo/LogoVEESERV-Blue.png'; // Replace with your logo image path
import { Ionicons } from '@expo/vector-icons'; // For the eye and location icons

const Login = ({ navigation }) => {
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const emailAnim = useState(new Animated.Value(0))[0];
  const passwordAnim = useState(new Animated.Value(0))[0];

  const validateEmail = (email_address) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email_address).toLowerCase());
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return minLength && hasUpperCase && hasLowerCase;
  };

  const handleLogin = () => {
    if (!email_address || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email_address)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be 6+ characters with both uppercase and lowercase letters.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a login request
    setTimeout(() => {
      setLoading(false);
      alert('Logged In!');
    }, 1000);
  };

  const handleFocus = (anim, setFocused) => {
    setFocused(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (anim, setFocused, value) => {
    if (!value) {
      setFocused(false);
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const emailLabelStyle = {
    position: 'absolute',
    left: 10,
    top: emailAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: emailAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: emailAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A0A0A0', Colors.blue],
    }),
  };

  const passwordLabelStyle = {
    position: 'absolute',
    left: 10,
    top: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A0A0A0', Colors.blue],
    }),
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Logo */}
        <Image source={Logo} style={styles.logo} />

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={emailLabelStyle}>Email</Animated.Text>
          <TextInput
            style={styles.input}
            value={email_address}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => handleFocus(emailAnim, setEmailFocused)}
            onBlur={() => handleBlur(emailAnim, setEmailFocused, email_address)}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Animated.Text style={passwordLabelStyle}>Password</Animated.Text>
          <TextInput
            key={showPassword ? 'visible' : 'hidden'} 
            secureTextEntry={!showPassword} 
            autoCorrect={false}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleFocus(passwordAnim, setPasswordFocused)}
            onBlur={() => handleBlur(passwordAnim, setPasswordFocused, password)}
          />
          <TouchableOpacity
                      style={styles.showPasswordButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color={Colors.gray}
                      />
            </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => setIsModalVisible(true)} // Show the modal when login is clicked
          >
            Sign up
          </Text>
        </Text>

        {/* User Type Selection Modal */}
        <UserTypeSelection
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectType={(type) => {
            navigation.navigate('SignUp', { userType: type }); // Pass the selected type to SignUp
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;