// ChatSession.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { database } from '../config/firebaseConfig';
import firebase from 'firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatSession = ({ route }) => {
  const { doctorName, doctorRole, doctorImage } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDoctorOnline, setIsDoctorOnline] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(database, 'messages', doctorName, 'chats'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Check doctor's online status
    const docRef = doc(database, 'doctors', doctorName);
    const unsubscribeStatus = onSnapshot(docRef, (doc) => {
      setIsDoctorOnline(doc.data()?.isOnline);
    });

    return () => {
      unsubscribe();
      unsubscribeStatus();
    };
  }, [doctorName]);

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      // Create a new message object for immediate local state update
      const newMessage = {
        id: Math.random().toString(), // Temporary ID
        text: message,
        sender: 'user',
        timestamp: new Date() // Temporary timestamp for local use
      };

      // Add the message to the local state for instant display
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Reset the input field right after adding to state
      setMessage('');

      try {
        // Send the message to Firestore
        await addDoc(collection(database, 'messages', doctorName, 'chats'), {
          text: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          sender: 'user', // or use the authenticated user's ID
        });
      } catch (error) {
        console.error("Error sending message: ", error);
        // Optionally, you can handle error cases such as showing an alert or reverting the UI changes
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const startVideoCall = () => {
    navigation.navigate('Call', {
      //userID: 'user123', // replace with actual user ID
      //userName: 'User Name', // replace with actual user name
      callID: `call_${doctorName}_${Date.now()}`, // unique call ID
    });
  };

  const goToMap = () => {
    navigation.navigate('MapScreen'); // Navigate to MapScreen
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageItem, item.sender === 'user' ? styles.userMessage : styles.doctorMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <View style={styles.backButtonHighlight}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={require('../assets/female_doctor.jpeg')} style={styles.doctorImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{doctorName}</Text>
          <Text style={styles.headerSubText}>{doctorRole}</Text>
          <Text style={styles.onlineStatus}>{isDoctorOnline ? 'Online' : 'Offline'}</Text>
        </View>
        <TouchableOpacity onPress={startVideoCall} style={styles.iconButton}>
          <Icon name="video-camera" size={25} color="#C5314E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMap} style={styles.iconButton}>
          <Icon name="map-marker" size={25} color="#C5314E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E1E1', marginTop: 50 },
  backButton: { padding: 2 },
  backButtonHighlight: {
    backgroundColor: '#C5314E',
    borderRadius: 20,
    padding: 2,
    marginLeft: 15,
    marginTop: 10,
    height: 25,
    width: 25,
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  doctorImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  headerTextContainer: { flex: 1 },
  headerText: { fontSize: 22, fontWeight: 'bold' },
  headerSubText: { fontSize: 16, color: '#888' },
  onlineStatus: { fontSize: 14, color: '#C5314E' },
  iconButton: { marginLeft: 10, padding: 10 },
  chatArea: { flex: 1, padding: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 80 },
  input: { flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, padding: 10 },
  sendButton: {
    backgroundColor: '#C5314E',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageItem: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  doctorMessage: { alignSelf: 'flex-start', backgroundColor: '#FFF' },
  messageText: { fontSize: 16 },
});

export default ChatSession;
