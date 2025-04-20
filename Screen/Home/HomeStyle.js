// HomeStyle.js

//to do : image scroll .....

import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Components/Colors/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.black,
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginHorizontal: 20,
    height: 44,
    
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  
  imageBanner: {
    width: width - 40, // عشان فيه marginHorizontal: 20
    height: 160,
    borderRadius: 12,
    marginRight: 10,
  },
  

  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 20,
  },
 
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryContent: {
    flexDirection: 'row',
    marginLeft: 20,
    gap: 10,
   
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
   
  },
  categoryText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
