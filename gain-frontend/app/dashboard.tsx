import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

// Semi-linear function to generate data points
const generateSemiLinearData = (slope, intercept, variation, length) => {
  return Array.from({ length }, (_, index) => {
    const baseValue = slope * index + intercept;
    const randomVariation = Math.random() * variation - variation / 2;
    return baseValue + randomVariation;
  });
};

const generateSemiLinearInvestmentData = () => {
  const slope = 10;
  const intercept = 50;
  const variation = 15;
  
  return {
    mutual_funds: generateSemiLinearData(slope, intercept, variation, 5),
    gold: generateSemiLinearData(slope - 2, intercept - 10, variation, 5),
    fixed_deposits: generateSemiLinearData(slope + 1, intercept - 5, variation, 5),
    stocks: generateSemiLinearData(slope + 5, intercept + 10, variation, 5),
    loan: generateSemiLinearData(-slope + 2, intercept + 20, variation, 5)
  };
};

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

export default function UserData() {
  const [investmentData, setInvestmentData] = useState(generateSemiLinearInvestmentData());

  useEffect(() => {
    setInvestmentData(generateSemiLinearInvestmentData());
  }, []);

  const labels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];

  const pieChartData = [
    { name: "Mutual Funds", population: 40, color: "#ffd700", legendFontColor: "#7F8C8D", legendFontSize: 15 },
    { name: "Gold", population: 30, color: "#ff9800", legendFontColor: "#7F8C8D", legendFontSize: 15 },
    { name: "Fixed Deposits", population: 30, color: "#4caf50", legendFontColor: "#7F8C8D", legendFontSize: 15 },
  ];

  const renderLineChartContainer = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Investment Breakdown (Line Chart)</Text>
      
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: investmentData.mutual_funds,
              color: () => '#ffd700',
              strokeWidth: 2,
              label: 'Mutual Funds'
            },
            {
              data: investmentData.gold,
              color: () => '#ff9800',
              strokeWidth: 2,
              label: 'Gold'
            },
            {
              data: investmentData.fixed_deposits,
              color: () => '#4caf50',
              strokeWidth: 2,
              label: 'Fixed Deposits'
            },
          ]
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
      />
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ffd700' }]} />
          <Text style={styles.legendText}>Mutual Funds</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ff9800' }]} />
          <Text style={styles.legendText}>Gold</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#4caf50' }]} />
          <Text style={styles.legendText}>Fixed Deposits</Text>
        </View>
      </View>
    </View>
  );

  const renderPieChart = () => (
    <View style={styles.pieChartContainer}>
      <Text style={styles.title}>Investment Breakdown (Pie Chart)</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 0]}
        absolute
      />
      <View style={styles.legendContainer}>
        {pieChartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBarChartContainer = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Suggested Mutual Funds</Text>
      
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: investmentData.mutual_funds
            }
          ]
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={styles.chart}
        verticalLabelRotation={30}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Top section with the logo and greeting */}
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/logooo.png')} style={styles.logo} />
        <Text style={styles.greeting}>Hello Alex 👋</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Click to Chat" placeholderTextColor="#7F8C8D" />
        <FontAwesome name="search" size={20} color="#000" />
      </View>

      {renderPieChart()}
      {renderLineChartContainer()}
      {renderBarChartContainer()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    marginRight: 5,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
});
