import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { database } from 'firebase';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const collectionRef = collection(database, 'users');
    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      setUsers(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const startChat = (user) => {
    // Navigate to the Chat screen with the selected user's details
    navigation.navigate('Chat', { user });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => startChat(item)}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userStatus}>{item.isOnline ? 'Online' : 'Offline'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  userContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  userInfo: { flexDirection: 'row', justifyContent: 'space-between' },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userStatus: { fontSize: 14, color: 'gray' },
});

export default UserList;
