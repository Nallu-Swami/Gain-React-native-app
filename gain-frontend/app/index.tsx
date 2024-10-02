import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function IndexScreen() {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      {/* Top left GAIN logo and text */}
      <View style={styles.logoHeader}>
        <Image
          source={require('../assets/images/logooo.png')} // Ensure the path is correct
          style={styles.logo}
        />
        <Text style={styles.gainText}>GAIN</Text>
      </View>

      {/* Center faded logo */}
      <View style={styles.fadedLogoContainer}>
        <Image
          source={require('../assets/images/logooo.png')} // Ensure the path is correct
          style={styles.fadedLogo}
        />
      </View>

      {/* Input box section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter details here"
          placeholderTextColor="grey"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => alert(`Entered: ${inputValue}`)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoHeader: {
    position: 'absolute',
    top: 40, // Adjust spacing from the top
    left: 20, // Adjust spacing from the left
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  gainText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
  fadedLogoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%', // Adjust this value to center the faded logo
    opacity: 0.1, // Faded effect
    zIndex: -1, // Ensure it's behind other elements
  },
  fadedLogo: {
    width: 250, // Adjust size of the faded logo
    height: 250,
    resizeMode: 'contain',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 40, // Adjust spacing from the bottom
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  submitButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
