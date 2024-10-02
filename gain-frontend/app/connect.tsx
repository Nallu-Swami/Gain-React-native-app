import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ConnectScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logooo.png')} // Ensure this path is correct
          style={styles.logo}
        />
        <Text style={styles.gainText}>GAIN</Text>
      </View>

      {/* Connected Section */}
      <Text style={styles.sectionTitle}>Connected</Text>
      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/lady1.png')} // Ensure this path is correct
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>RIYA KAPOOR</Text>
            <Text style={styles.profileEmail}>riyakapoor@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.meetButton}>
            <MaterialIcons name="videocam" size={20} color="#fff" />
            <Text style={styles.meetButtonText}>MEET NOW</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileDescription}>
          She is a SEBI-authorized investing guide who is skilled at managing portfolios, providing tailored financial advice, and ensuring her clients' investments comply with regulatory standards for optimal growth and security.
        </Text>
      </View>

      {/* Connect With Section */}
      <Text style={styles.sectionTitle}>Connect With</Text>
      <View style={styles.cardAlt}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/men1.png')} // Ensure this path is correct
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>SHRI SINHA</Text>
            <Text style={styles.profileEmail}>shrisinha@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.payButton}>
            <FontAwesome name="credit-card" size={20} color="#fff" />
            <Text style={styles.payButtonText}>PAY NOW</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileDescription}>
          He is a SEBI-authorized investing guide with expertise in managing portfolios, offering personalized financial advice, and ensuring his clients' investments adhere to regulatory standards for maximum growth and security.
        </Text>
      </View>

      {/* Add the moved profile in the Connect With section with the PAY NOW button */}
      <View style={styles.cardAlt}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/lady2.png')} // Ensure this path is correct
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>SERA JOSEPH</Text>
            <Text style={styles.profileEmail}>serajoseph@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.payButton}>
            <FontAwesome name="credit-card" size={20} color="#fff" />
            <Text style={styles.payButtonText}>PAY NOW</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileDescription}>
          She is a SEBI-authorized investing guide who is skilled at managing portfolios, providing tailored financial advice, and ensuring her clients' investments comply with regulatory standards for optimal growth and security.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',
    paddingTop: 20, // Added space at the top
  },
  logo: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    resizeMode: 'contain',
  },
  gainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardAlt: {
    backgroundColor: '#f5f5f5', // Light grey background for alternate card
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
  },
  meetButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default ConnectScreen;
