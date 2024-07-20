import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user.name,
    });
  }, [navigation, user]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats', user.id, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, [user]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user: messageUser } = messages[0];
    addDoc(collection(database, 'chats', user.id, 'messages'), {
      _id,
      createdAt,
      text,
      user: messageUser,
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: 'https://i.pravatar.cc/300',
        }}
        messagesContainerStyle={styles.messagesContainer}
        textInputStyle={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E1E1' },
  messagesContainer: { backgroundColor: '#fff' },
  textInput: { backgroundColor: '#fff', borderRadius: 20 },
});
