import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './WorkshopCardStyle';

const WorkshopCard = ({ image, name, rating, distance, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>
          {'⭐'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </Text>
        <Text style={styles.distance}>{distance} km</Text>
      </View>

      <View style={styles.side}>
        <Text style={styles.price}>{price}₪</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default WorkshopCard;
