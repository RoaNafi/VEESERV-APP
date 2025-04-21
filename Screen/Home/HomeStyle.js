// HomeStyle.js


import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Components/Colors/Colors';

const { width } = Dimensions.get('window');

// this insted of add padding to the container
const PADDING = 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // greeting: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   marginBottom: 12,
  //   color: Colors.blue,
  //   marginHorizontal: 20,
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  // },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginHorizontal: 20,
    height: 44,
    marginTop: width * 0.13,
    zIndex: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollContent: {
    flex: 1,
  },
  searchResultsContainer: {
    flex: 1,
    //paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.black,
    marginHorizontal: PADDING,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: 50,
  },
  
  imageScroll: {
    paddingHorizontal: PADDING,
     marginBottom : 20
 },
  imageBanner: {
    width: width - 70, 
    height: 160,
    borderRadius: 12,
    marginLeft: 10,
  },
  

  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: PADDING,
  },
 
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  categoryScroll: {
    
  },
  categoryContent: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 24 ,
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
