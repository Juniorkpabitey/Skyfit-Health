import React, { useState, useEffect, useRef } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {View,Text,TextInput,FlatList,StyleSheet,ActivityIndicator,TouchableOpacity,KeyboardAvoidingView,Platform,} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { REACT_APP_GEMINI_API_KEY } from '@env';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const flatListRef = useRef(null);

  const API_KEY = REACT_APP_GEMINI_API_KEY;

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "hello! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      showMessage({
        message: "Welcome to Let's Talk Chat 🤖",
        description: text,
        type: "info",
        icon: "info",
        duration: 2000,
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const botMessage = { text, user: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);
    setUserInput("");

    if (text && !isSpeaking) {
      Speech.speak(text);
      setIsSpeaking(true);
      setShowStopIcon(true);
    }

    flatListRef.current.scrollToEnd({ animated: true });
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(messages[messages.length - 1].text);
      setIsSpeaking(true);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.user ? styles.userMessage : styles.botMessage,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
          {isSpeaking ? (
            <FontAwesome
              name="microphone-slash"
              size={24}
              color="white"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          ) : (
            <FontAwesome
              name="microphone"
              size={24}
              color="white"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
        {showStopIcon && (
          <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
            <Entypo name="controller-stop" size={24} color="white" />
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator size="large" color="black" />}
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffff" },
  messageContainer: { padding: 10, marginVertical: 5, borderRadius: 10 },
  messageText: { fontSize: 16 },
  userMessageContainer: { alignSelf: "flex-end", backgroundColor: "#dcf8c6" },
  botMessageContainer: { alignSelf: "flex-start", backgroundColor: "#f1f0f0" },
  userMessage: { color: "#000" },
  botMessage: { color: "#000", fontWeight: "bold" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 1, marginBottom:80, },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  sendIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
});

export default GeminiChat;
