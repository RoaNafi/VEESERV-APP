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
    name: 'test info',
    phone: '1234567890',
    email: 'test.info@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  };

  const menuItems = [
    // زرّين جنب بعض
    {
      type: 'double',
      items: [
        { icon: 'create-outline', label: 'ُEdit Profile', action: () => navigation.navigate('UpdateProfile') },
        { icon: 'car', label: 'Garage', action: () => navigation.navigate('Garage') }
      ]
    },
  
    // باقي القائمة
    { icon: 'time', label: 'History', action: () => navigation.navigate('History') },
    { icon: 'globe', label: 'Language', action: () => navigation.navigate('Language') },
    { icon: 'key', label: 'Change Password', action: () => navigation.navigate('ChangePassword') },
    { icon: 'settings', label: 'Settings & Privacy', action: () => {} },
    { icon: 'people', label: 'Invite Friends', action: () => {} },
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
  {menuItems.map((item, idx) => {
    if (item.type === 'double') {
      return (
        <View key={idx} style={styles.doubleRow}>
          {item.items.map((subItem, subIdx) => (
            <TouchableOpacity
              key={subIdx}
              style={styles.halfMenuItem}
              onPress={subItem.action}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={subItem.icon} style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{subItem.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.menuItem}
          onPress={item.action}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons
              name={item.icon}
              style={[styles.menuIcon, item.isLogout && { color: 'red' }]}
            />
            <Text style={[styles.menuLabel, item.isLogout && { color: 'red' }]}>{item.label}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            style={item.isLogout && { color: 'red' }}
          />
        </TouchableOpacity>
      );
    }
  })}
</View>

    </ScrollView>
  );
};

export default Profile;
