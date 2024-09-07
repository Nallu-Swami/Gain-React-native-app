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
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="comments" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="userdata"
          options={{
            tabBarLabel: 'User Data',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={size} color={color} />
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