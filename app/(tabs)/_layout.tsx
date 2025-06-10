import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs initialRouteName="Doctors">
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="Doctors"
        options={{
          headerShown: true,       
        }}
      />
    </Tabs>
  );
};

export default _layout;
