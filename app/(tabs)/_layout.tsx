import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs 
    initialRouteName="Doctors"
    screenOptions={{
      animation: 'shift',
    }}
    >
      <Tabs.Screen name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (<Ionicons name="home" size={size} color={color} />)
        }}
      />
      <Tabs.Screen
        name="Doctors"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (<FontAwesome6 name="user-doctor" size={size} color={color} />)
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (<Ionicons name="person" size={size} color={color} />)
        }}
      />
    </Tabs>
  );
};

export default _layout;
