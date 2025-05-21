import { Text, TouchableOpacity } from "react-native";

const BottomButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="bg-blue-500 rounded-full py-3 w-full mt-8 shadow-md active:opacity-80"
    onPress={onPress}
  >
    <Text className="text-white text-center text-base font-bold">{title}</Text>
  </TouchableOpacity>
);

export default BottomButton;
