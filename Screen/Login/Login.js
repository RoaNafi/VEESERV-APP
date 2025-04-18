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
import Colors from '../../Components/Colors/Colors';
import UserTypeSelection from '../RoleSelection/RoleSelection';
import Logo from '../../assets/Logo/LogoVEESERV-Blue.png';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {

  // States
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailAnim = useState(new Animated.Value(0))[0];
  const passwordAnim = useState(new Animated.Value(0))[0];

  

  // Handle Login
  const handleLogin = () => {
    if (!email_address || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email_address)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      alert('Logged In!');
    }, 1000); // TODO: Remove this untel we have a backend
  };

  // Validations

  const validateEmail = (email_address) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email_address).toLowerCase());
  };


  // Focus and Blur

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

  // Render
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
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
            onFocus={() => handleFocus(emailAnim)}
            onBlur={() => handleBlur(emailAnim, email_address)}
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
            onFocus={() => handleFocus(passwordAnim)}
            onBlur={() => handleBlur(passwordAnim, password)}
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => setIsModalVisible(true)}
          >
            Sign up
          </Text>
        </Text>

        <UserTypeSelection
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectType={(type) => {
            navigation.navigate('SignUp', { userType: type });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
