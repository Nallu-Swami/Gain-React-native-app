import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Logo and GAIN text section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logooo.png')} // Ensure the path is correct
          style={styles.logo}
        />
        <Text style={styles.gainText}>GAIN</Text>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/mark_zuckerberg.png')} // Ensure the image path is correct
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>MARK ZUCKERBERG</Text>
          <Text style={styles.profileTitle}>CEO, Facebook</Text>
          <Text style={styles.profileEmail}>markzuckerberg@facebook.com</Text>
          <Text style={styles.profilePhone}>+91 987654321</Text>
        </View>
      </View>

      {/* Earnings, Expenditure, and Savings Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <FontAwesome5 name="wallet" size={20} color="#000" />
          <Text style={styles.infoValue}>50K</Text>
          <Text style={styles.infoLabel}>EARNING</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="attach-money" size={20} color="#000" />
          <Text style={styles.infoValue}>30K</Text>
          <Text style={styles.infoLabel}>EXPENDITURE</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="piggy-bank" size={20} color="#000" />
          <Text style={styles.infoValue}>50K</Text>
          <Text style={styles.infoLabel}>SAVINGS</Text>
        </View>
      </View>

      {/* Risk Appetite Section */}
      <View style={styles.riskContainer}>
        <Text style={styles.riskText}>My Risk Appetite</Text>
        <View style={styles.gaugeContainer}>
          <Svg height="200" width="200" viewBox="0 0 200 100">
            {/* Red Arc */}
            <Path
              d="M 10 90 A 90 90 0 0 1 100 10"
              stroke="#FF6B6B"
              strokeWidth="10"
              fill="none"
            />
            {/* Pink Arc */}
            <Path
              d="M 100 10 A 90 90 0 0 1 145 55"
              stroke="#F6D6D6"
              strokeWidth="10"
              fill="none"
            />
            {/* Yellow Arc */}
            <Path
              d="M 145 55 A 90 90 0 0 1 180 90"
              stroke="#FFC300"
              strokeWidth="10"
              fill="none"
            />
            {/* Green Arc */}
            <Path
              d="M 180 90 A 90 90 0 0 1 190 100"
              stroke="#4CAF50"
              strokeWidth="10"
              fill="none"
            />
          </Svg>
          <View style={styles.textWrapper}>
            <Text style={styles.riskFactor}>821</Text>
            <Text style={styles.riskLabel}>Your risk factor is</Text>
          </View>
        </View>
      </View>

      {/* Recent Interactions Section */}
      <View style={styles.recentInteractions}>
        <Text style={styles.recentText}>Recent Interactions</Text>
        <View style={styles.interactionItem}>
          <View>
            <Text style={styles.interactionName}>Urdan Inc.</Text>
            <Text style={styles.interactionType}>URDAN</Text>
          </View>
          <View>
            <Text style={styles.interactionPrice}>$213.22</Text>
            <Text style={styles.interactionChange}>+2.49 (8%)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileTitle: {
    fontSize: 14,
    color: '#777',
  },
  profileEmail: {
    fontSize: 13,
    color: '#777',
  },
  profilePhone: {
    fontSize: 13,
    color: '#777',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
  },
  riskContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textWrapper: {
    position: 'absolute',
    top: '50%', 
    alignItems: 'center',
  },
  riskFactor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00c853',
  },
  riskLabel: {
    fontSize: 12,
    color: '#777',
  },
  recentInteractions: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  recentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  interactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  interactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  interactionType: {
    fontSize: 12,
    color: '#aaa',
  },
  interactionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  interactionChange: {
    fontSize: 12,
    color: 'green',
    textAlign: 'right',
  },
});

export default ProfileScreen;
