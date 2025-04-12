/*import React from 'react';
import { Box, VStack, Center, Avatar, Text, Pressable, HStack, Icon, ScrollView, Button } from 'native-base';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Profile = ({ navigation }) => {

  // user data 
  const user = {
    name: 'Roa Nafi',
    phone: '1234567890',
    email: 'RoaNafi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  };

  // menu items 
  const menuItems = [
    { icon: 'car', label: 'Garage', action: () => navigation.navigate('Garage') },
    { icon: 'time', label: 'History', action: () => navigation.navigate('History') },
    { icon: 'globe', label: 'Language', action: () => navigation.navigate('Language') },
    { icon: 'key', label: 'Change Password', action: () => navigation.navigate('ChangePassword') },
    { icon: 'friends', label: 'Invite Friends', action: () => {} },
    { icon: 'settings', label: 'Settings & Privacy', action: () => {} },
  ];

  return (
    <ScrollView bg="white" _dark={{ bg: 'gray.800' }}>
      <Center mt={10}>
        <Text fontSize="xl" fontWeight="bold" mb={3}>VEESERV</Text>
        <Avatar size="2xl" source={{ uri: user.avatar }} />
        <Text fontSize="lg" mt={4} fontWeight="bold">{user.name}</Text>
        <Text fontSize="sm" color="gray.500">{user.phone}</Text>
        <Text fontSize="sm" color="gray.500">{user.email}</Text>
      </Center>

      <VStack mt={8} space={2} mx={4}>
        {menuItems.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={item.action}
            bg="gray.100"
            p={4}
            rounded="md"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" space={3}>
              <Icon
                as={item.icon === 'friends' ? FontAwesome5 : Ionicons}
                name={item.icon}
                size="md"
                color="gray.700"
              />
              <Text fontSize="md">{item.label}</Text>
            </HStack>
            <Icon as={Ionicons} name="chevron-forward" size="md" color="gray.400" />
          </Pressable>
        ))}
      </VStack>

      <Center mt={6} mb={10}>
        <Button colorScheme="red" px={10} onPress={() => navigation.navigate('Login')}>
          Log out
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Profile;
*/



import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './ProfileStyle';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  const menuItems = [
    { icon: 'car', label: 'Garage', action: () => navigation.navigate('Garage') },
    { icon: 'time', label: 'History', action: () => navigation.navigate('History') },
    { icon: 'globe', label: 'Language', action: () => navigation.navigate('Language') },
    { icon: 'key', label: 'Change Password', action: () => navigation.navigate('ChangePassword') },
    { icon: 'people', label: 'Invite Friends', action: () => {} },
    { icon: 'settings', label: 'Settings & Privacy', action: () => {} },
    { icon: 'log-out', label: 'Log out', action: () => navigation.navigate('Login'), isLogout: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerContent}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={item.action}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={item.icon}
                size={22}    
                style={[styles.menuIcon, item.isLogout && { color: 'red' }]}
              />
              <Text style={[styles.menuLabel, item.isLogout && { color: 'red' }]}>{item.label}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              
              style={item.isLogout && { color: 'red' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;
