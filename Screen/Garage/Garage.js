import React from 'react';
import {
  View,
  Text,
  ScrollView,

} from 'react-native';
import styles from './GarageStyle';
import { Ionicons } from '@expo/vector-icons';

const Garage = () => {


  // moch data
  const cars = [
    {
      id: 1,
      name: 'Alfa Romeo 4C',
      year: 2015,
      engine: '1,7L L4 (EBC) Turbocharged GAS FI',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Acura ILX',
      year: 2021,
      engine: '2,4L L4 (K24V7) GAS FI',
    },
    {
      id: 3,
      name: 'Audi A1',
      year: 2021,
      engine: 'N/A',
    },
  ];

  return (
    <View style={styles.container}>
 


  <ScrollView>
    {cars.map((car) => (
      <View key={car.id} style={styles.card}>
        {car.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
        <Ionicons name="car-outline" size={50} color="#333" style={styles.carIcon} />
        <Text style={styles.carName}>
          {car.name} <Text style={styles.carYear}>{car.year}</Text>
        </Text>
        <Text style={styles.carDetails}>{car.engine}</Text>
      </View>
    ))}
  </ScrollView>
</View>

  );
};

export default Garage;
