import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';


// Function to generate random data
const generateRandomData = () => {
  const generateRandomArray = (length: number) => 
    Array.from({ length }, () => Math.floor(Math.random() * 100));

  return {
    mutual_funds: generateRandomArray(5),
    gold: generateRandomArray(5),
    fixed_deposits: generateRandomArray(5),
    stocks: generateRandomArray(5),
    loan: generateRandomArray(5),
  };
};

export default function UserData() {
  const widthAndHeight = 240;
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];
  const sectionNames = ['Mutual Funds', 'Fixed Deposit', 'Gold', 'Stocks', 'Loan'];
  
  const [userData, setUserData] = useState({
    uuid: '',
    user_name: '',
    user_occupation: '',
    user_aim: '',
    user_risk_level: '',
    user_source_of_income: ''
  });

  const [investmentBreakdown, setInvestmentBreakdown] = useState(generateRandomData());

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('parsed-user-data')
        .select('uuid, user_name, user_occupation, user_aim, user_risk_level, user_source_of_income')
        .single(); // Use .single() if you expect only one row

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setUserData(data);
    };

    fetchUserData();
  }, []);

  // Sample data for the PieChart, you should replace this with your actual data
  const series = investmentBreakdown.stocks; // Example using one of the categories

  // Calculate the total and the percentage of each series
  const total = series.reduce((sum, value) => sum + value, 0);
  const percentages = series.map(value => ((value / total) * 100).toFixed(2)); // Two decimal places for the percentage

  return (
    <View style={styles.container1}>
      <View style={styles.rect1}>
        <View><Text>1.UUID: {userData.uuid || 'Loading...'}</Text></View>
        <View><Text>2.Name: {userData.user_name || 'Loading...'}</Text></View>
        <Text>3.Occupation: {userData.user_occupation || 'Loading...'}</Text>
        <Text>4.Aim : {userData.user_aim || 'Loading...'}</Text>
        <Text>5.Risk : {userData.user_risk_level || 'Loading...'}</Text>
        <Text>6.Income : {userData.user_source_of_income || 'Loading...'}</Text>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.title}>Distribution</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
        <View style={styles.legendContainer}>
          {sectionNames.map((name, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: sliceColor[index] }]} />
              <Text style={styles.legendText}>
                {name} - {percentages[index]}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'grey',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect1: {
    marginBottom: 10,
    width: '95%',
    height: '35%',
    backgroundColor: "rgba(200, 200, 200, 1)", // Darker light grey
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect2: {
    width: '95%',
    height: '58%',
    backgroundColor: "rgba(200, 200, 200, 1)", // Darker light grey
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black color
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
});
