import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log(`user input ${username}`);
  };

  return (
    <View style={styles.container}>
      {/* Upper Text */}
      <Text style={styles.upperText}>Welcome Back</Text>
      
      {/* Logo Image */}
      <Image 
        source={require('/Users/aringy/Desktop/MATH/gain-frontend/assets/images/log.png')}
        style={styles.image}
      />
      
      {/* Username Input */}
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter"
        placeholderTextColor="grey"
      />
      
      {/* Login Button Mayeb add something else*/}
      
      {/* Footer Text */}
      <Text style={styles.footerText}>Forgot your username?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  upperText: {
    fontSize: 28,
    color: 'white',
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  textInput: {
    height: 60,
    width: '80%',
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  footerText: {
    color: 'white',
    marginTop: 20,
  },
});
