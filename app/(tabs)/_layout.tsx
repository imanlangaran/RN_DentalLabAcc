import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { HeaderShownContext } from "@react-navigation/elements";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="Doctors"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
