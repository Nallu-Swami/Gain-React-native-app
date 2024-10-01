import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

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
  const slope = 10;  // Increase per year
  const intercept = 50;  // Starting value
  const variation = 15;  // Allow for some random variation
  
  return {
    mutual_funds: generateSemiLinearData(slope, intercept, variation, 5),
    gold: generateSemiLinearData(slope - 2, intercept - 10, variation, 5),
    fixed_deposits: generateSemiLinearData(slope + 1, intercept - 5, variation, 5),
    stocks: generateSemiLinearData(slope + 5, intercept + 10, variation, 5),
    loan: generateSemiLinearData(-slope + 2, intercept + 20, variation, 5)
  };
};

const chartConfig = {
  backgroundColor: "#2c3e50", // Dark blue background
  backgroundGradientFrom: "#2c3e50",
  backgroundGradientTo: "#2c3e50",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,

  borderColor: '#000',
  borderWidth: 2,
  shadowOffset: { width: 5, height: 10 },
  shadowOpacity: 0.3,
  shadowRadius: 15,
};

export default function UserData() {
  const [investmentData, setInvestmentData] = useState(generateSemiLinearInvestmentData());

  useEffect(() => {
    setInvestmentData(generateSemiLinearInvestmentData());
  }, []);

  const labels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];

  const renderLineChartContainer = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Investment Breakdown</Text>
      
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
            {
              data: investmentData.stocks,
              color: () => '#2196f3',
              strokeWidth: 2,
              label: 'Stocks'
            },
            {
              data: investmentData.loan,
              color: () => '#e91e63',
              strokeWidth: 2,
              label: 'Loan'
            }
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
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#2196f3' }]} />
          <Text style={styles.legendText}>Stocks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#e91e63' }]} />
          <Text style={styles.legendText}>Loan</Text>
        </View>
      </View>
    </View>
    
  );

  const renderBarChartContainer = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Investment Bar Chart</Text>
      
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
      {renderLineChartContainer()}
      {renderBarChartContainer()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e2638', // Dark blue background
  },
  chartContainer: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#34495e',
    padding: 10,
    backgroundColor: '#2c3e50', // Darker card background
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#ecf0f1', // Light text color
  },
  chart: {
    marginRight: 30,
    borderRadius: 16,
    borderWidth: 0,
  },
  legendContainer: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  legendText: {
    fontSize: 18,
    color: '#ecf0f1', // Light text color
  },
});
