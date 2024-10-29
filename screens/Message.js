import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const doctors = [
  { name: 'Dr. Stella Nartey', role: 'Midwife', image: 'https://example.com/dr-stella.jpg' },
  { name: 'Dr. Hoya Quahsie', role: 'Cardiologist', image: 'https://example.com/dr-john.jpg' },
  { name: 'Dr. Esi Mensima', role: 'Prediatician', image: 'https://example.com/dr-john.jpg' },

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
      {/* Add the title here */}
      <Text style={styles.title}>Let's Chat</Text>
      
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E1E1',
    paddingTop: 50, // Adjusts for better spacing
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:20,
    marginBottom: 10,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 14,
    color: '#888',
  },
});

export default Message;
