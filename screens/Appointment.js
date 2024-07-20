import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reason, setReason] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const bookAppointment = () => {
    console.log(`Appointment booked on ${selectedDate} for reason: ${reason}`);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'red' },
        }}
        theme={{
          arrowColor: 'red',
          selectedDayBackgroundColor: 'red',
          todayTextColor: 'red',
        }}
        style={styles.calendar}
      />
      <View style={styles.appointmentContainer}>
        <View style={styles.doctorInfo}>
          <Image source={require('../assets/female_doctor.jpeg')} style={styles.doctorImage} />
          <View>
            <Text style={styles.doctorName}>Stella Nartey</Text>
            <Text style={styles.doctorRole}>Midwife</Text>
          </View>
        </View>
        <Text style={styles.appointmentSlot}>Appointment slot: 10:00am - 12:00pm</Text>
        <TextInput
          style={styles.input}
          placeholder="Reason for appointment"
          value={reason}
          onChangeText={setReason}
        />
        <TouchableOpacity style={styles.bookButton} onPress={bookAppointment}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E1E1',
    padding: 20,
    marginTop: 60,


  },
  calendar: {
    marginBottom: 20,
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D4C41',
  },
  doctorRole: {
    fontSize: 14,
    color: '#888',
  },
  appointmentSlot: {
    fontSize: 16,
    color: '#6D4C41',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#C5314E',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
