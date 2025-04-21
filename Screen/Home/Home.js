
//to do : add filter button and add filter screen
//to do : add sort button and add sort screen


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


// need to add color to each catagory in data using API.........
const categories = [
  { id: 1, name: 'Washing' , color: '#FF9149'},
  { id: 2, name: 'Emergency', color: '#27548A'},
  { id: 3, name: 'Maintenance' , color: '#60B5FF'},
  { id: 4, name: 'Maintenance', color: '#E9A5F1' },
  { id: 5, name: 'Maintenance', color: '#578FCA' },
  { id: 6, name: 'Maintenance', color: '#7E99A3' },
   
];
// this from API
const banners = [
  'https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s',
  'https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg',
  'https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s',
];

const Home = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // Add loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 60),
        animated: true,
      });
    }, 3000); // auto scroll every 3 sec

    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleSearch = (text) => {
    setIsSearching(true);
    if (text.trim().length > 0) {
      // API IMPLEMENTATION: Replace this with actual API call
      // 1. Set loading state
      setIsLoading(true);
      
      // 2. Make API call to search endpoint
      // Example:
      // fetch(`https://your-api.com/search?q=${encodeURIComponent(text)}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     setSearchResults(data.results);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error('Search error:', error);
      //     setIsLoading(false);
      //   });
      
      // 3. For now, using simulated data
      setTimeout(() => {
        setSearchResults([
          {
            id: 1,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 2,
            name: 'QuickFix Garage',
            image: banners[1],
            rating: 4,
            distance: 3,
            price: 20,
          },
          {
            id: 3,
            name: 'AutoCar Workshop',
            image: banners[1],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 4,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 5,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 6,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 7,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 8,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },
          {
            id: 9,
            name: 'AutoCar Workshop',
            image: banners[0],
            rating: 3,
            distance: 2,
            price: 15,
          },

        ]);
        setIsLoading(false);
      }, 500); // Simulate network delay
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Anything..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => handleSearch(searchTerm)}
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

    
      {/* Scrollable Content */}
      {!isSearching && (
        <ScrollView style={styles.scrollContent}>

          {/* image scroll section */}
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
            
          >
            {banners.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.imageBanner}
              />
            ))}
          </ScrollView>


          {/*Categories section*/}
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.categoryChip, { backgroundColor: item.color }]} >
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/*Explore our Services section*/}
          <Text style={styles.sectionTitle}>Explore our Services</Text>

        </ScrollView>
      )}



       {/* Search Results with loading indicator */}
       {isSearching && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsTitle}>Search Results</Text>
          
          {/* API IMPLEMENTATION: Add loading indicator */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text>Loading...</Text>
              {/* Add your loading spinner component here */}
            </View>
          ) : searchResults.length > 0 ? (
            <ScrollView>
              {searchResults.map((result) => (
                <WorkshopCard
                  key={result.id}
                  image={result.image}
                  name={result.name}
                  rating={result.rating}
                  distance={result.distance}
                  price={result.price}
                  onPress={() => console.log(`Navigate to ${result.name}`)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found for "{searchTerm}"</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
