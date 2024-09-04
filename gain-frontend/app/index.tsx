import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from './supabaseClient';
import axios from 'axios';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  //UUID created for every session
  const generateUUID = () => {
  let d = new Date().getTime();
  let d2 = 16 * Math.pow(2, 31) - 1;
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

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('parsed-user-data')
      .insert([{ uuid, whole_parsed_data: username }]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted:', data);
    }

    // Send POST request to localhost:4040/upload
    const response = await axios.post('http://10.50.48.168:4040/upload', { uuid });

    // Check the response from the POST request
    if (response.status === 200) {
      console.log('UUID sent successfully:', response.data);
    } else {
      console.error('Failed to send UUID:', response.data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
  
};
  const handleLogin = async () => {
  console.log(username);
};

  return (
    <View style={styles.container}>
      {/* Upper Text */}
      <Text style={styles.upperText}>Welcome aboard!</Text>
      <Text style={styles.upperText1}>Quick and easy—just required provide the information, and we'll take care of the rest!</Text>
      {/* Logo Image */}
      <Image source={require('/Users/aringy/Desktop/MATH/gain-frontend/assets/images/Logo.png')} style={styles.image} />

      {/* Username Input */}
      <TextInput style={styles.textInput} value={username} onChangeText={setUsername} placeholder="Enter your Details" placeholderTextColor="grey" />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={senduserdata}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>Valid Input ✅:</Text>

      {/* Example text*/}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          My name is <Text style={{ color: 'yellow' }}>Yoshikage Kira</Text>. I work as an <Text style={{ color: 'yellow' }}>Employee at the Kame Yu department stores</Text>, which is my primary source of income. By the time I reach a particular age, my goal is to own a <Text style={{ color: 'yellow' }}>2BHK</Text> flat in Tokyo.
        </Text>
      </View>
      {/* Footer Text */}
      <Text style={styles.footerText}>Invalid Input ❌:</Text>

      {/* Example text*/}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          My name is <Text style={{ color: 'red' }}>IDontKnow</Text>. I do <Text style={{ color: 'red' }}>Art for fun</Text>, which is not a source of income. By the time I reach a particular age, my goal is <Text style={{ color: 'red' }}>live a life with no hassle</Text> alone.
        </Text>
      </View>
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
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 1.2,
  },
  upperText1: {
    fontSize: 18,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1.1,
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  textInput: {
    height: 60,
    width: '85%',
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: 'black',
    borderWidth: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  footerContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 20,
    marginBottom : 20,
    elevation: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  footerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});