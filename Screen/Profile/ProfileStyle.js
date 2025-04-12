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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 16,
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
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 2,
  },
  menuContainer: {
    marginTop: 30,
    paddingHorizontal: width * 0.03,
  },
  menuItem: {
    backgroundColor: Colors.lightGray,
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
  },
  menuLabel: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: Colors.red,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
