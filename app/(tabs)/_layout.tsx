import React, { ReactElement, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { buttomTabBarStyle } from "@/styles";

const tabBarHeight = 60;

const TabIcon = ({
  icon,
  color,
  size,
  focused
}: {
  icon: ReactElement<any>;
  color: string;
  size: number;
  focused: boolean;
}): ReactElement => {
  // const [iconSize, setIconSize] = useState(0);

  // const onLayout = (event: LayoutChangeEvent) => {
  //   const { height } = event.nativeEvent.layout;
  //   setIconSize(height * 0.8); // Use 80% of the container height
  // };

  return (<View
    // onLayout={onLayout}
    style={{
      height: '100%',
      aspectRatio: 1, // This makes width equal to height
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 9999,
      backgroundColor: focused ? '#ffffff' : 'transparent'
    }}
  >
    {React.cloneElement(icon, {
      // color: focused ? 'red' : 'blue',
      color,
      size
    })}
  </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        tabBarShowLabel: false,
        tabBarStyle: {
          // ...buttomTabBarStyle.container,
          backgroundColor: '#3b82f6', // bg-blue-500
          borderRadius: 9999,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4.65,
          elevation: 4,
          marginHorizontal: 20,
          marginVertical: 20,
          height: tabBarHeight
        },
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 3,
          // borderRadius: 9999 // This will make each pressable area rounded
        },
        tabBarIconStyle: { height: '100%', width: '100%' },
        tabBarActiveTintColor: '#2563eb', // bg-blue-600
        // tabBarActiveTintColor: '#1d4ed8', // bg-blue-700
        tabBarInactiveTintColor: '#fff'
      }}
    >
      <Tabs.Screen name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            TabIcon({
              icon: <Ionicons name="home" />,
              color,
              size,
              focused
            })
        }}
      />
      <Tabs.Screen
        name="Doctors"
        options={{
          headerShown: true, tabBarIcon: ({ color, size, focused }) =>
            TabIcon({
              icon: <FontAwesome6 name="user-doctor" />,
              color,
              size,
              focused
            })
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            TabIcon({
              icon: <Ionicons name="person" />,
              color,
              size,
              focused
            })
        }}
      />
    </Tabs>
  );
};

export default _layout;
