import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LottieView from 'lottie-react-native';
import profileImage from '../assets/woman.jpeg'; 
import moon from '../assets/moon.png';
import stars from '../assets/stars.png';
import celebration from '../assets/celebration.json';  // imported celebration animation json file

const Dashboard = ({ navigation, route }) => {
  const email = route.params?.email || 'default@example.com';
  const name = route.params?.name || 'Anne';

  const [weekNumber, setWeekNumber] = useState(25);  // weeks of pregnancy
  const [showCelebration, setShowCelebration] = useState(false);
  const [progress, setProgress] = useState(30);  // Assume progress percentage for 12 weeks
  const fullTerm = 37;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert("Logout Error", error.message);
      });
  };

  // Handle Progress and Color changes (Matching with the bottom card colors)
  const getProgressColor = () => {
    if (weekNumber < 20) return "#FFB6C1"; // Light Pink
    if (weekNumber < 30) return "#FF69B4"; // Hot Pink
    if (weekNumber < 40) return "#C61942"; // Red (same as bottom card)
    return "#32CD32"; // Green when at full term (celebration color)
  };

  useEffect(() => {
    if (weekNumber === fullTerm) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);  // Show for 5 seconds
    }
  }, [weekNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { email, name })}>
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hi, {name}</Text>
            <Text style={styles.welcomeTitle}>Welcome to Skyfit</Text>
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
            <Icon name="calendar-outline" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out-outline" size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        {/* Circular Progress Bar */}
        <AnimatedCircularProgress
          size={200}
          width={30}
          fill={(weekNumber / fullTerm) * 100}
          tintColor={getProgressColor()}
          backgroundColor="#e0e0e0"
          rotation={0}>
          {
            () => (
              <View>
                <Text style={styles.weekNumber}>{weekNumber}</Text>
                <Text style={styles.weekText}>WEEKS</Text>
              </View>
            )
          }
        </AnimatedCircularProgress>
      </View>

      <Text style={styles.quote}>
        "You are capable of amazing things, mama. Trust your body, trust yourself."
      </Text>

      {weekNumber === fullTerm && (
        <View style={styles.congratsContainer}>
          <Text style={styles.congratsText}>🎉 Congratulations! You are ready to deliver! 🎉</Text>
        </View>
      )}

      <View style={[styles.bottomCard, { backgroundColor: getProgressColor() }]}>
        <Image source={moon} style={styles.logo} />
        <Text style={styles.bottomCardText}>
          {weekNumber === fullTerm ? 'Congratulations!' : `${fullTerm - weekNumber} WEEKS TO GO!`}
        </Text>
        <Image source={stars} style={styles.logo} />
      </View>

      {/* Celebration Animation */}
      {showCelebration && (
        <LottieView
          source={celebration}
          autoPlay
          loop={false}
          style={styles.celebrationAnimation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E4E4',
    padding: 20,
    paddingTop: 40,
    marginTop: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  userInfo: { marginLeft: 10 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#33396A', paddingTop: 15 },
  welcomeTitle: { 
    fontSize: 15, 
    marginTop: 1, 
    color: '#33396A' },
  icons: { 
    flexDirection: 'row', 
    alignItems: 'center' },
  icon: { 
    marginHorizontal: 10 },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  weekNumber: { 
    fontSize: 50, 
    fontWeight: 'bold', 
    color: '#33396A' },
  weekText: { 
    fontSize: 20, 
    textAlign:'center',
    color: '#33396A' },
  quote: { 
    fontSize: 20, 
    textAlign: 'center',
    fontWeight:'bold', 
    marginVertical: 10, 
    color: '#33396A' },
  bottomCard: {
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  bottomCardText: { fontSize: 25, color: '#FFF', textAlign: 'center', flex: 1 },
  logo: { width: 30, height: 30, resizeMode: 'contain' },
  celebrationAnimation: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  congratsContainer: { alignItems: 'center', marginVertical: 20 },
  congratsText: { fontSize: 20, fontWeight: 'bold', color: '#32CD32' },
});

export default Dashboard;
