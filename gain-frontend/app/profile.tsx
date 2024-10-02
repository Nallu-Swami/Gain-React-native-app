import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Logo and GAIN text section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logooo.png')} // Make sure the path is correct
          style={styles.logo}
        />
        <Text style={styles.gainText}>GAIN</Text> {/* Wrapping the GAIN text properly */}
      </View>

      {/* User Profile Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/mark_zuckerberg.png')} // Make sure the path is correct
          style={styles.profileImage}
        />
        <Text style={styles.name}>MARK ZUCKERBERG</Text>
        <Text style={styles.title}>CEO, Facebook</Text>
        <Text style={styles.email}>markzuckerberg@facebook.com</Text>
        <Text style={styles.phone}>+91 987654321</Text>
      </View>

      {/* Earnings, Expenditure, and Savings Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <FontAwesome5 name="wallet" size={24} color="#000" />
          <Text style={styles.infoValue}>50K</Text>
          <Text style={styles.infoLabel}>EARNING</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="attach-money" size={24} color="#000" />
          <Text style={styles.infoValue}>30K</Text>
          <Text style={styles.infoLabel}>EXPENDITURE</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="piggy-bank" size={24} color="#000" />
          <Text style={styles.infoValue}>50K</Text>
          <Text style={styles.infoLabel}>SAVINGS</Text>
        </View>
      </View>

      {/* Risk Appetite Section */}
      <View style={styles.riskContainer}>
        <Text style={styles.riskText}>My Risk Appetite</Text>
        <View style={styles.gaugeContainer}>
          <AnimatedCircularProgress
            size={180}
            width={10}
            fill={75}
            arcSweepAngle={180}
            rotation={-90}
            lineCap="round"
            tintColor="#4CAF50"
            backgroundColor="#FF6B6B"
          />
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
          <Text style={styles.interactionName}>Urdan Inc.</Text>
          <Text style={styles.interactionPrice}>$213.22</Text>
          <Text style={styles.interactionChange}>+2.49 (8%)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#777',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  phone: {
    fontSize: 14,
    color: '#777',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
  },
  riskContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00c853',
  },
  riskLabel: {
    fontSize: 14,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  interactionName: {
    fontSize: 14,
  },
  interactionPrice: {
    fontSize: 14,
    color: '#000',
  },
  interactionChange: {
    fontSize: 14,
    color: 'green',
  },
});

export default ProfileScreen;
