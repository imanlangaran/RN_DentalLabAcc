import { StyleSheet } from "react-native";
import { buttomTabBarStyle } from "./buttomTabBar";

export const buttomButtonStyle = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent'
  },
  container: {
    ...buttomTabBarStyle.container,
  }
})