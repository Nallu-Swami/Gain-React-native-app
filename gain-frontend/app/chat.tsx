import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const data = {
  categorization: {
    name: "Saahil Ahmad",
    occupation: "Student",
    sourceofincome: "Internship for 1 year and PPO afterwards",
    expenses: "10k for 1 year and 4lac for 4 years",
    savings: "5k for 1 year and 8 lac for 4 years",
    familysize: "1",
    goal: "Car",
    goal_amount: "30lac",
    term: "5 years",
    risk: "High risk"
  },
  investment_breakdown: {
    mutual_funds: "20%",
    gold: "10%",
    fixed_deposits: "10%",
    stocks: "60%",
    note: "This investment strategy is aligned with Saahil's high-risk tolerance and has the potential for high returns but also requires regular monitoring."
  },
  mf_schemes: [
    {
      name: "Aditya Birla Sun Life PSU Equity Fund-Direct - Payout of IDCW",
      return_percentage: 63.80
    },
    {
      name: "Kotak Nifty 200 Momentum 30 Index Fund - Regular Plan - Growth Option",
      return_percentage: 63.76
    },
    {
      name: "quant Multi Asset Fund - IDCW Option - Regular Plan",
      return_percentage: 44.92
    },
    {
      name: "quant Active Fund-GROWTH OPTION-Direct Plan",
      return_percentage: 43.08
    },
    {
      name: "Kotak Multi Asset Allocation Fund - Direct Plan - IDCW Option",
      return_percentage: 31.65
    }
  ],
  fd_schemes: [
    {
      name: "Shriram Transport Finance",
      interest_rate: "7.80% - 8.60%"
    },
    {
      name: "DHFL",
      interest_rate: "8.25% - 8.95%"
    },
    {
      name: "Bandhan Bank",
      interest_rate: "3.00% - 7.85%"
    },
    {
      name: "ICICI Home Finance",
      interest_rate: "7.25% - 7.50%"
    },
    {
      name: "DCB Bank",
      interest_rate: "4.75% - 7.25%"
    }
  ],
  final_comparison: {
    mutual_funds_savings: 2895200,
    fixed_deposits_savings: 562000,
    total_savings_after_4_years: 3057200,
    note: "The total amount is more than enough to achieve Saahil's goal of buying a car worth 30 lac in 5 years."
  },
  loan_suggestions: [
    {
      bank: "Bank Of Baroda",
      interest_rate: "7.35% - 9.10%",
      emi_range: "59,585 - 62,264"
    },
    {
      bank: "Bank of Maharashtra",
      interest_rate: "7.70% - 8.45%",
      emi_range: "60,160 - 61,603"
    },
    {
      bank: "Canara Bank",
      interest_rate: "7.30% - 9.90%",
      emi_range: "59,370 - 63,252"
    },
    {
      bank: "Central Bank of India",
      interest_rate: "7.25% - 7.50%",
      emi_range: "59,287 - 59,678"
    },
    {
      bank: "Corporation Bank",
      interest_rate: "7.40% - 7.50%",
      emi_range: "59,509 - 59,678"
    }
  ]
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface DetailProps {
  label: string;
  value: string;
}

const App: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        <View style={styles.cardContent}>
          <Detail label="Name" value={data.categorization.name} />
          <Detail label="Occupation" value={data.categorization.occupation} />
          <Detail label="Source of Income" value={data.categorization.sourceofincome} />
          <Detail label="Expenses" value={data.categorization.expenses} />
          <Detail label="Savings" value={data.categorization.savings} />
          <Detail label="Family Size" value={data.categorization.familysize} />
          <Detail label="Goal" value={data.categorization.goal} />
          <Detail label="Goal Amount" value={data.categorization.goal_amount} />
          <Detail label="Term" value={data.categorization.term} />
          <Detail label="Risk" value={data.categorization.risk} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Investment Breakdown</Text>
        <View style={styles.cardContent}>
          <Detail label="Mutual Funds" value={data.investment_breakdown.mutual_funds} />
          <Detail label="Gold" value={data.investment_breakdown.gold} />
          <Detail label="Fixed Deposits" value={data.investment_breakdown.fixed_deposits} />
          <Detail label="Stocks" value={data.investment_breakdown.stocks} />
          <Text style={styles.note}>{data.investment_breakdown.note}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mutual Fund Schemes</Text>
        <View style={styles.cardContent}>
          {data.mf_schemes.map((scheme, index) => (
            <Detail key={index} label={scheme.name} value={`${scheme.return_percentage}%`} />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fixed Deposit Schemes</Text>
        <View style={styles.cardContent}>
          {data.fd_schemes.map((scheme, index) => (
            <Detail key={index} label={scheme.name} value={scheme.interest_rate} />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Final Comparison</Text>
        <View style={styles.cardContent}>
          <Detail label="Mutual Funds Savings" value={`₹${data.final_comparison.mutual_funds_savings}`} />
          <Detail label="Fixed Deposits Savings" value={`₹${data.final_comparison.fixed_deposits_savings}`} />
          <Detail label="Total Savings After 4 Years" value={`₹${data.final_comparison.total_savings_after_4_years}`} />
          <Text style={styles.note}>{data.final_comparison.note}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Loan Suggestions</Text>
        <View style={styles.cardContent}>
          {data.loan_suggestions.map((loan, index) => (
            <View key={index} style={styles.loan}>
              <Text style={styles.label}>{loan.bank}</Text>
              <Text style={styles.loanDetail}>Interest Rate: {loan.interest_rate}</Text>
              <Text style={styles.loanDetail}>EMI Range: {loan.emi_range}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const Detail: React.FC<DetailProps> = ({ label, value }) => (
  <View style={styles.detail}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2, // Increased border thickness
    borderColor: '#000', // Black border
    marginBottom: 16,
    padding: 16,
    elevation: 8, // Enhanced shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset
    shadowOpacity: 0.2, // Enhanced shadow opacity
    shadowRadius: 10, // Increased shadow radius
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  cardContent: {
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#555',
  },
  value: {
    color: '#333',
    fontSize: 16,
  },
  note: {
    fontStyle: 'italic',
    marginTop: 8,
    color: '#777',
  },
  loan: {
    marginBottom: 12,
  },
  loanDetail: {
    marginBottom: 4,
    color: '#555',
  },
});

export default App;
