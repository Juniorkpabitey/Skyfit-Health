// Dashboard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ navigation, route }) => {
  const email = route.params?.email || 'default@example.com';
  const name = route.params?.name || 'User';

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert("Logout Error", error.message);
      });
  };

  const getProfileImageUrl = (email) => {
    const hash = email.toLowerCase().trim();
    return `https://i.pravatar.cc/150?u=${hash}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: getProfileImageUrl(email) }} style={styles.profileImage} />
        <Text style={styles.greeting}>Hi, {name}</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
            <Icon name="calendar-outline" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.weekNumber}>12</Text>
        <Text style={styles.weekText}>WEEKS</Text>
      </View>
      <Text style={styles.quote}>
        "You are capable of amazing things, mama. Trust your body, trust yourself."
      </Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.bottomCardText}>25 WEEKS TO GO!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E4E4',
    padding: 20,
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    marginTop: 60,
    marginBottom:-30,
    paddingRight: 80,
    paddingTop:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',

  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    justifyContent:"flex-end",
  },
  card: {
    backgroundColor: '#C5314E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 40,
    width: 120,
    height: 120,
  },
  weekNumber: {
    fontSize: 40,
    color: '#FFF',
  },
  weekText: {
    fontSize: 20,
    color: '#FFF',
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  progressBarContainer: {
    height: 25,
    backgroundColor: '#DDD',
    borderRadius: 5,
    marginVertical: 20,
  },
  progressBar: {
    height: 25,
    backgroundColor: '#C5314E',
    width: '60%',
    borderRadius: 5,
  },
  bottomCard: {
    backgroundColor: '#C5314E',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomCardText: {
    fontSize: 25,
    color: '#FFF',
  },
});

export default Dashboard;
