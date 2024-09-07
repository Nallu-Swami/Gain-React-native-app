import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const generateRandomData = () => {
  return {
    mutual_funds: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
    gold: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
    fixed_deposits: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
    stocks: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
    loan: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
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
  const [investmentData, setInvestmentData] = useState(generateRandomData());
  
  useEffect(() => {
    setInvestmentData(generateRandomData());
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
              color: () => '#fbd203',
              strokeWidth: 2,
              label: 'Mutual Funds'
            },
            {
              data: investmentData.gold,
              color: () => '#ffb300',
              strokeWidth: 2,
              label: 'Gold'
            },
            {
              data: investmentData.fixed_deposits,
              color: () => '#ff9100',
              strokeWidth: 2,
              label: 'Fixed Deposits'
            },
            {
              data: investmentData.stocks,
              color: () => '#ff6c00',
              strokeWidth: 2,
              label: 'Stocks'
            },
            {
              data: investmentData.loan,
              color: () => '#ff3c00',
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
          <View style={[styles.legendColorBox, { backgroundColor: '#fbd203' }]} />
          <Text style={styles.legendText}>Mutual Funds</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ffb300' }]} />
          <Text style={styles.legendText}>Gold</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ff9100' }]} />
          <Text style={styles.legendText}>Fixed Deposits</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ff6c00' }]} />
          <Text style={styles.legendText}>Stocks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#ff3c00' }]} />
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
    backgroundColor: '#f5f5f5',
  },
  chartContainer: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  chart: {
    marginRight: 30,
    borderRadius: 16,
    borderWidth: 0,
    borderColor: '#000',
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
    borderColor: '#000',
  },
  legendText: {
    fontSize: 18,
    color: '#333',
  },
});
