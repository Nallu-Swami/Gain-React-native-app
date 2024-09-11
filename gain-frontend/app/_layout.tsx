import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; 

const _layout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
            headerShown: false, // Hide the header for this screen
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="info-circle" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="chart-bar" size={size} color={color} />
            ),
            headerShown: false, 
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;