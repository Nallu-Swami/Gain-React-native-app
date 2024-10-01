import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const data = {
  categorization: {
    name: "Saahil Ahmad",
    occupation: "Student",
    source_of_income: "Internship for 1 year and PPO afterwards",
    expenses: "5k per month, 60k for 1 year; may rise to 4 lac per year",
    savings: "5k per month, 60k for 1 year, 8 lac for 4 years",
    family_size: 1,
    goal: "Car",
    goal_amount: "30 lacs",
    term: "5 years",
    risk: "High"
  },
  loan_suggestions: [
    {
      bank: "SBI",
      interest_rate: "7.95% p.a. to 10.70% p.a.",
      processing_fee: "Up to 1% of the loan amount"
    },
    {
      bank: "Indian Bank",
      interest_rate: "7.65% p.a. to 12.60% p.a.",
      processing_fee: "Up to 1% of the loan amount"
    },
    {
      bank: "Punjab and Sind Bank (Overdraft)",
      interest_rate: "9.50% to 10.20%"
    },
    {
      bank: "Bank of Baroda",
      interest_rate: "8.95% p.a. to 11.25% p.a.",
      processing_fee: "Up to 1.50% of the loan amount"
    },
    {
      bank: "Karnataka Bank (MSME Loans)",
      interest_rate: "9.66% to 16.18%"
    }
  ],
  investment_breakdown: {
    mutual_funds: "40%",
    gold: "20%",
    fds: "40%",
    stocks: "0%",
    note: "Saahil's high-risk tolerance suggests a focus on mutual funds and FDs."
  },
  mf_schemes: [
    {
      name: "Quant Large & Mid Cap Fund - Bonus Option",
      return_percentage: 55.17
    },
    {
      name: "HDFC Housing Opportunities Fund - Growth Option",
      return_percentage: 46.49
    },
    {
      name: "Motilal Oswal Nifty Realty ETF",
      return_percentage: 21.65
    },
    {
      name: "Nippon India Retirement Fund- Income Generation Scheme",
      return_percentage: 13.98
    },
    {
      name: "Edelweiss Business Cycle Fund - IDCW Option",
      return_percentage: 0.79
    }
  ],
  fd_schemes: [
    {
      bank: "DHFL",
      interest_rate: "8.25% - 8.95%",
      tenure: "1 year - 10 years"
    },
    {
      bank: "Tamilnad Mercantile Bank",
      interest_rate: "7.80% - 8.60%",
      tenure: "1 year - 5 years"
    },
    {
      bank: "Kotak Mahindra Bank",
      interest_rate: "4.00% - 6.20%",
      tenure: "3 months - 10 years"
    },
    {
      bank: "Central Bank of India",
      interest_rate: "4.75% - 6.25%",
      tenure: "3 months - 10 years"
    },
    {
      bank: "RBL Bank",
      interest_rate: "4.75% - 7.00%",
      tenure: "3 months - 10 years"
    }
  ],
  final_comparison: {
    mutual_funds_savings: 2895200,
    fixed_deposits_savings: 562000,
    total_savings_after_4_years: 3057200,
    note: "The total amount is enough to buy a car worth ₹30 lacs in 5 years."
  },
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface DetailProps {
  label: string;
  value: string;
}

const Detail: React.FC<DetailProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

const App: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Section title="Personal Information">
        <Detail label="Name" value={data.categorization.name} />
        <Detail label="Occupation" value={data.categorization.occupation} />
        <Detail label="Source of Income" value={data.categorization.source_of_income} />
        <Detail label="Expenses" value={data.categorization.expenses} />
        <Detail label="Savings" value={data.categorization.savings} />
        <Detail label="Family Size" value={data.categorization.family_size.toString()} />
        <Detail label="Goal" value={data.categorization.goal} />
        <Detail label="Goal Amount" value={data.categorization.goal_amount} />
        <Detail label="Term" value={data.categorization.term} />
        <Detail label="Risk" value={data.categorization.risk} />
      </Section>

      <Section title="Investment Breakdown">
        <Detail label="Mutual Funds" value={data.investment_breakdown.mutual_funds} />
        <Detail label="Gold" value={data.investment_breakdown.gold} />
        <Detail label="FDs" value={data.investment_breakdown.fds} />
        <Detail label="Stocks" value={data.investment_breakdown.stocks} />
        <Detail label="Note" value={data.investment_breakdown.note} />
      </Section>

      <Section title="Mutual Fund Schemes">
        {data.mf_schemes.map((scheme, index) => (
          <Detail key={index} label={scheme.name} value={`${scheme.return_percentage}%`} />
        ))}
      </Section>

      <Section title="Fixed Deposit Schemes">
        {data.fd_schemes.map((scheme, index) => (
          <Detail key={index} label={scheme.bank} value={`${scheme.interest_rate} (Tenure: ${scheme.tenure})`} />
        ))}
      </Section>

      <Section title="Final Comparison">
        <Detail label="Mutual Funds Savings" value={`₹${data.final_comparison.mutual_funds_savings}`} />
        <Detail label="Fixed Deposits Savings" value={`₹${data.final_comparison.fixed_deposits_savings}`} />
        <Detail label="Total Savings After 4 Years" value={`₹${data.final_comparison.total_savings_after_4_years}`} />
        <Detail label="Note" value={data.final_comparison.note} />
      </Section>

      <Section title="Loan Suggestions">
        {data.loan_suggestions.map((loan, index) => (
          <Detail key={index} label={loan.bank} value={`${loan.interest_rate}`} />
        ))}
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e2638', // Dark blue background
  },
  card: {
    backgroundColor: '#2c3e50', // Darker card background
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#34495e', // Slightly lighter border for definition
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ecf0f1', // Light gray for better contrast
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardContent: {
    paddingVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e', // Slightly lighter border
  },
  detailLabel: {
    fontWeight: '600',
    fontSize: 15,
    color: '#bdc3c7', // Light gray for labels
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: '#ecf0f1', // Lighter color for values
    flex: 1,
    textAlign: 'right',
  },
});

export default App;