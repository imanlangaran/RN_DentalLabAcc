import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        gap:55,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Link href={"/Screens/NewDoctor"}> New Doctor </Link>
      {/* <Link href={"/Screens/NewDoctor2"}> New Doctor 2 </Link> */}
      <Link href={"/Screens/NewOrder"}> New Order </Link>
    </View>
  );
}
