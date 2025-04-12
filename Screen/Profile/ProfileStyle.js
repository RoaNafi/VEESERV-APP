import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Components/Colors/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContent: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
 
  avatar: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 2,
  },
  menuContainer: {
    marginTop: 30,
    paddingHorizontal: width * 0.03,
  },
  menuItem: {
    backgroundColor: Colors.lightGray,
   // borderColor: Colors.darkGray,
   // borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 14,
    fontSize: 22,
    color: Colors.darkGray,
  },
  menuLabel: {
    fontSize: 18,
    color: Colors.darkGray,
  },

  logoutText:{
    color: Colors.red ,
    flex: 1, 
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    

  },
 


  doubleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  
  halfMenuItem: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  
  
});
