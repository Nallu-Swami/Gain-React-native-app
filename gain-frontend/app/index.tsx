import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from './supabaseClient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define a type for the message object
type Message = {
  text: string;
  sender: 'user' | 'bot'; // Specify sender can only be 'user' or 'bot'
};

export default function ChatScreen() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Specify the type for messages
  const scrollViewRef = useRef<ScrollView>(null); // Create a ref for the ScrollView

  const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  const senduserdata = async () => {
    try {
      const uuid = generateUUID();
      console.log(uuid);
      const { data, error } = await supabase
        .from('parsed-user-data')
        .insert([{ uuid, whole_parsed_data: username }]);
      
      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted:', data);
      }

      const response = await axios.post('http://172.20.10.4:4040/upload', { uuid });

      if (response.status === 200) {
        console.log('UUID sent successfully:', response.data);
        // Append bot message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `User data sent! UUID: ${uuid}`, sender: 'bot' },
        ]);
      } else {
        console.error('Failed to send UUID:', response.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Failed to send UUID', sender: 'bot' },
        ]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Unexpected error occurred', sender: 'bot' },
      ]);
    }
  };

  const sendMessage = () => {
    if (username.trim() !== '') {
      // Append user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: username, sender: 'user' },
      ]);
      senduserdata();
      setUsername('');
    }
  };

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your Details"
          placeholderTextColor="grey"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  botMessage: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
