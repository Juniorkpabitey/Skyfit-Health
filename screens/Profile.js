import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or you can use any icon library you prefer

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Picture and Name */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://path-to-your-image.com/profile-image' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Anne</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="user" size={30} color="#fff" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Icon name="calendar" size={30} color="#fff" />
          <Text style={styles.optionText}>Pregnancy Track</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Icon name="map-marker" size={30} color="#fff" />
          <Text style={styles.optionText}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Icon name="sign-out" size={30} color="#fff" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e9e4',
    alignItems: 'center',
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#423a3a',
    marginTop: 10,
  },
  optionsContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '45%',
    backgroundColor: '#c93a47',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default ProfileScreen;
