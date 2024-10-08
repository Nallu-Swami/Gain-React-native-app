import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

// Define the type for the card item props
interface CardItemProps {
  name: string;
  bank: string;
  amount: string;
  change: string;
}

// Define the type for the data
interface DataItem {
  name: string;
  bank: string;
  amount: string;
  change: string;
}

interface Data {
  final_comparison: DataItem[];
  suggested_schemes: DataItem[];
}

const data: Data = {
  final_comparison: [
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" },
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" },
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" }
  ],
  suggested_schemes: [
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" },
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" },
    { name: "Mutual Fund Saving", bank: "URDAN", amount: "$213.22", change: "+2.49 (8%)" }
  ]
};

const CardItem: React.FC<CardItemProps> = ({ name, bank, amount, change }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{name}</Text>
      <Text style={styles.itemSubtitle}>{bank}</Text>
    </View>
    <View style={styles.itemAmountContainer}>
      <Text style={styles.itemAmount}>{amount}</Text>
      <Text style={styles.itemChange}>{change}</Text>
    </View>
  </View>
);

const Report: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logooo.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>GAIN</Text>
      </View>

      <Text style={styles.reportTitle}>Report</Text>

      {/* Final Comparison Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Final Comparison</Text>
        {data.final_comparison.map((item, index) => (
          <CardItem
            key={index}
            name={item.name}
            bank={item.bank}
            amount={item.amount}
            change={item.change}
          />
        ))}
      </View>

      {/* Suggested Schemes Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Suggested Schemes</Text>
        {data.suggested_schemes.map((item, index) => (
          <CardItem
            key={index}
            name={item.name}
            bank={item.bank}
            amount={item.amount}
            change={item.change}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 40, // Adjust the size of the logo as needed
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTextContainer: {
    flex: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  itemAmountContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemChange: {
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default Report; 
