import React from "react";
import { Tabs } from "expo-router";

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
