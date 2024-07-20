import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import DrStella from '../assets/female_doctor.jpeg';

const doctors = [
  { name: 'Dr. Stella Nartey', role: 'Midwife', image: 'https://example.com/dr-stella.jpg' },
  { name: 'Dr. Hoya Quahsie', role: 'Cardiologist', image: 'https://example.com/dr-john.jpg' },
  // Add more doctors here
];

const Message = () => {
  const navigation = useNavigation();

  const navigateToChat = (doctor) => {
    navigation.navigate('ChatSession', {
      doctorName: doctor.name,
      doctorRole: doctor.role,
      doctorImage: doctor.image,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToChat(item)}>
      <Image source={require('../assets/female_doctor.jpeg')} style={styles.doctorImage} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.roleText}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E1E1', marginTop:100, },
  itemContainer: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  doctorImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  textContainer: { justifyContent: 'center' },
  nameText: { fontSize: 18, fontWeight: 'bold' },
  roleText: { fontSize: 14, color: '#888' },
});

export default Message;
