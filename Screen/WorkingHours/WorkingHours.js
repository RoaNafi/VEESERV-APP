import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import Colors from '../../Components/Colors/Colors'; // Ensure this path is correct

const { width, height } = Dimensions.get('window');

const WorkingHours = ({ navigation, route }) => {
  const { role } = route.params;
  const [workingHours, setWorkingHours] = useState({
    Monday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Tuesday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Wednesday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Thursday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Friday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Saturday: { open: true, startTime: '12:00 AM', endTime: '11:59 PM' },
    Sunday: { open: false, startTime: '12:00 AM', endTime: '11:59 PM' },
  });
  const [showPicker, setShowPicker] = useState({ day: null, field: null, type: null }); // Track which picker is visible
  const [pickerValues, setPickerValues] = useState([]); // Values for the picker

  const handleSaveWorkingHours = () => {
    // Print the working hours to the console
    console.log('Working Hours:', JSON.stringify(workingHours, null, 2));
    Alert.alert('Success', 'Working hours printed to console!');

    navigation.navigate('ProfilePicture', { role });
  };

  const handleToggleDay = (day) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const openPicker = (day, field, type) => {
    if (!workingHours[day].open) return; // Disable picker if the day is closed
    let values = [];
    if (type === 'hour') {
      values = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    } else if (type === 'minute') {
      values = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')); // 0, 5, 10, ..., 55
    } else if (type === 'period') {
      values = ['AM', 'PM'];
    }
    setPickerValues(values);
    setShowPicker({ day, field, type });
  };

  const handlePickerSelect = (value) => {
    const { day, field, type } = showPicker;
    const currentTime = workingHours[day][field];
    const [hour, minute, period] = currentTime.split(/[: ]/);

    let newTime = '';
    if (type === 'hour') {
      newTime = `${value}:${minute} ${period}`;
    } else if (type === 'minute') {
      newTime = `${hour}:${value} ${period}`;
    } else if (type === 'period') {
      newTime = `${hour}:${minute} ${value}`;
    }

    handleTimeChange(day, field, newTime);
    setShowPicker({ day: null, field: null, type: null });
  };

  const renderTimeInput = (day, field) => {
    const time = workingHours[day][field];
    if (!time) {
      return (
        <View style={styles.timeInputContainer}>
          <Text style={[styles.timeText, styles.disabledTimeText]}>--</Text>
          <Text style={[styles.timeSeparator, styles.disabledTimeText]}>:</Text>
          <Text style={[styles.timeText, styles.disabledTimeText]}>--</Text>
          <Text style={[styles.timeText, styles.disabledTimeText]}>--</Text>
        </View>
      );
    }

    const [hour, minute, period] = time.split(/[: ]/);

    return (
      <View style={styles.timeInputContainer}>
        <TouchableOpacity
          onPress={() => openPicker(day, field, 'hour')}
          style={[styles.timeInput, !workingHours[day].open && styles.disabledTimeInput]}
          disabled={!workingHours[day].open}
        >
          <Text style={[styles.timeText, !workingHours[day].open && styles.disabledTimeText]}>
            {hour}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.timeSeparator, !workingHours[day].open && styles.disabledTimeText]}>
          :
        </Text>
        <TouchableOpacity
          onPress={() => openPicker(day, field, 'minute')}
          style={[styles.timeInput, !workingHours[day].open && styles.disabledTimeInput]}
          disabled={!workingHours[day].open}
        >
          <Text style={[styles.timeText, !workingHours[day].open && styles.disabledTimeText]}>
            {minute}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openPicker(day, field, 'period')}
          style={[styles.timeInput, !workingHours[day].open && styles.disabledTimeInput]}
          disabled={!workingHours[day].open}
        >
          <Text style={[styles.timeText, !workingHours[day].open && styles.disabledTimeText]}>
            {period}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Working Hours</Text>

      <ScrollView style={styles.scrollContainer}>
        {Object.keys(workingHours).map((day, index) => (
          <View key={day}>
            <View style={styles.dayContainer}>
              <View style={styles.dayRow}>
                <TouchableOpacity
                  style={[styles.checkbox, workingHours[day].open && styles.checkboxChecked]}
                  onPress={() => handleToggleDay(day)}
                >
                  {workingHours[day].open && <Icon name="check" size={20} color={Colors.white} />}
                </TouchableOpacity>
                <Text style={styles.dayText}>{day}</Text>
              </View>
              <View style={styles.timeRow}>
                {renderTimeInput(day, 'startTime')}
                <Text style={[styles.timeSeparator, !workingHours[day].open && styles.disabledTimeText]}>
                     to  
                </Text>
                {renderTimeInput(day, 'endTime')}
              </View>
            </View>
            {index < Object.keys(workingHours).length - 1 && ( // Add a line between days
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleSaveWorkingHours}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Picker Modal */}
      <Modal
  visible={showPicker.day !== null}
  transparent={true}
  animationType="fade"
>
  <View style={styles.modalContainer}>
    <View style={styles.pickerGridContainer}>
      {pickerValues.map((value, index) => (
        <TouchableOpacity
          key={value}
          style={styles.pickerGridItem}
          onPress={() => handlePickerSelect(value)}
        >
          <Text style={styles.pickerGridItemText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity
      style={styles.modalCloseButton}
      onPress={() => setShowPicker({ day: null, field: null, type: null })}
    >
      <Text style={styles.modalCloseButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to white
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: height * 0.03,
    marginTop: height * 0.08,
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
    marginBottom: height * 0.1, // Space for the button
  },
  dayContainer: {
    width: '90%',
    marginBottom: height * 0.02,
    alignSelf: 'center',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayText: {
    fontSize: width * 0.04,
    color: Colors.black,
    marginLeft: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: Colors.blue,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.blue,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 35, // Align with the checkbox
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    padding: 6,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledTimeInput: {
    backgroundColor: Colors.grayLight, // Gray background when disabled
    borderColor: Colors.grayLight, // Gray border when disabled
  },
  timeText: {
    fontSize: width * 0.04,
    color: Colors.black,
  },
  disabledTimeText: {
    color: Colors.gray, // Gray text when disabled
  },
  timeSeparator: {
    fontSize: width * 0.04,
    color: Colors.black,
    marginLeft: 5,
    marginRight: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight, // Light gray line
    width: '90%',
    alignSelf: 'center',
    marginBottom: height * 0.02, // Space below the line
  },
  button: {
    backgroundColor: Colors.blue,
    width: '90%',
    paddingVertical: height * 0.015,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android
    position: 'absolute',
    bottom: height * 0.02, // Position the button at the bottom
  },
  buttonText: {
    color: Colors.white,
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    maxHeight: height * 0.6,
  },
  pickerGridItem: {
    width: '25%', // Adjust this to control the number of columns
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerGridItemText: {
    fontSize: width * 0.04,
    color: Colors.black,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: Colors.white,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default WorkingHours;