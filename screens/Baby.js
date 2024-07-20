import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const features = [
  { name: 'Feeding', image: require('../assets/feeding.jpeg') },
  { name: 'Sleep', image: require('../assets/sleep.jpeg') },
  { name: 'Vaccine', image: require('../assets/vaccination.jpeg') },
  { name: 'Weight', image: require('../assets/weighing.jpeg') },
];

const BabyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../assets/baby.jpeg')} style={styles.profileImage} />
        <Text style={styles.profileName}>Baby</Text>
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
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#6D4C41',
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  featureImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D4C41',
  },
});

export default BabyScreen;
