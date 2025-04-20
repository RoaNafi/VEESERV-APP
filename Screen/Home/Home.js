import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './HomeStyle';
import { Ionicons } from '@expo/vector-icons';
import WorkshopCard from '../../Components/Intro/WorkshopCard/WorkshopCard';
const { width } = Dimensions.get('window');


// need to add color to each catagory in data .........
const categories = [
  { id: 1, name: 'Washing' , color: '#FF9149'},
  { id: 2, name: 'Emergency', color: '#27548A'},
  { id: 3, name: 'Maintenance' , color: '#60B5FF'},
  { id: 4, name: 'Maintenance', color: '#E9A5F1' },
  { id: 5, name: 'Maintenance', color: '#578FCA' },
  { id: 6, name: 'Maintenance', color: '#7E99A3' },
   
];

const banners = [
  'https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s',
  'https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg',
];

const HomeScreen = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000); // auto scroll every 3 sec

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello Ro’a</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Anything..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}
        contentContainerStyle={{ paddingHorizontal: 20, marginBottom : 20}}
      >
        {banners.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.imageBanner}
          />
        ))}
      </ScrollView>


      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.categoryChip, { backgroundColor: item.color }]} >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Explore our Services</Text>

{/* just to test the card ..... */}
      <WorkshopCard
        image="https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg"
        name="AutoCar Workshop"
        rating={3}
        distance={2}
        price={15}
        onPress={() => console.log('Navigate to workshop')}
      />

    </ScrollView>
  );
};

export default HomeScreen;
