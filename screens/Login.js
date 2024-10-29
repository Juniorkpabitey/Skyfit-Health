import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import logo from '../assets/Logo.png';  // Import your logo here

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const displayName = user.displayName || user.email.split('@')[0];
        navigation.navigate('MainTabs', { email: user.email, name: displayName });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Login Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      {/* Display the logo above the login text */}
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> 
      {/*
      <Text style={styles.or}>Or</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      */}
      <Text style={styles.signUpText}>
        Or <Text onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>Sign up</Text>
      </Text>
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
  logo: {
    width: 100,  // Adjust size based on your logo dimensions
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 10,  // Add some space between logo and title
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#C5314E',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#C5314E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  or: {
    fontSize: 18,
    color: '#777',
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  signUpText: {
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
  signUpLink: {
    color: '#C5314E',
    fontWeight: 'bold',
  },
});

export default Login;
