import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Screen3 = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Landing');
    }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../assets/Logo.png')} style={styles.icon} />
      </View>
      <Text style={styles.title}>Skyfit</Text>
      <Text style={styles.subtitle}>Your Daily Maternal and Childbirth Care</Text>
      <Text style={styles.welcomeText}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EDED',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topSection: {
    backgroundColor: '#C5314E',
    width: '115%',
    alignItems: 'center',
    paddingVertical: 110,
    borderBottomLeftRadius: 500, // Adjust the radius to your preference
    borderBottomRightRadius: 10, // Adjust the radius to your preference
    overflow: 'hidden', // Ensure the curves are visible
    marginTop:-180,

  },
  icon: {
    alignItems: 'center',
    width: 300,
    height: 300,
    tintColor: '#FFF',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#C5314E',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: '#C5314E',
  },
});

export default Screen3;
