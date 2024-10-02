import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}> {/* Hide labels */}
      
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-pie" size={size} color={color} /> // Pie chart icon for Dashboard
          ),
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="report"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="file-alt" size={size} color={color} /> // Report icon
          ),
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="connect"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="headset" size={size} color={color} /> // Headset icon for Connect
          ),
          headerShown: false,
        }}
      />
      
       { <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} /> // User icon for Profile
          ),
          headerShown: false,
        }}
      /> }

    </Tabs>
  );
};

export default _layout;
