import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const features = [
  { name: 'Meals', image: require('../assets/meals.jpeg') },
  { name: 'Exercises', image: require('../assets/exercises.jpeg') },
  { name: 'Kick Start', image: require('../assets/kickstart.jpg') },
  { name: 'Articles', image: require('../assets/articles.jpeg') },
  { name: 'To Do List', image: require('../assets/to_do_list.jpeg') },
  { name: 'Emergency', image: require('../assets/emergency.jpg') },
];

const MotherScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../assets/woman.jpeg')} style={styles.profileImage} />
        <Text style={styles.profileName}>Anne</Text>
      </View>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureBox}>
            <Image source={feature.image} style={styles.featureImage} />
            <Text style={styles.featureName}>{feature.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3E1E1',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    marginTop:10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 5 },
    elevation: 2,
  },
  featureImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 3,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D4C41',
  },
});

export default MotherScreen;
