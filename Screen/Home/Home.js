import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Components/Colors/Colors'; // Ensure this path is correct

const { width, height } = Dimensions.get('window');

const Home = ({ route }) => {
  const { role, profilePicture } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Text style={styles.roleText}>You are logged in as: {role}</Text>

      {profilePicture && (
        <View style={styles.profileContainer}>
          <Text style={styles.subtitle}>Your Profile Picture:</Text>
          <Image
            source={{ uri: profilePicture }}
            style={styles.profileImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: height * 0.02,
  },
  roleText: {
    fontSize: width * 0.04,
    color: Colors.blue,
    marginBottom: height * 0.03,
  },
  profileContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: width * 0.05,
    color: Colors.black,
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    borderWidth: 3,
    borderColor: Colors.blue,
  },
});

export default Home;