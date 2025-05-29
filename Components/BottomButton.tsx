import { Text, TouchableOpacity } from "react-native";

const BottomButton = ({
  title,
  onPress,
  disable = false,
  className = ''
}: {
  title: string;
  onPress: () => void;
  disable: boolean;
  className?: string;
}) => (
  <TouchableOpacity
    className={`bg-blue-500 rounded-full w-full shadow-md active:opacity-80 ${className}`}
    onPress={onPress}
  >
    <Text className="text-white text-center text-base font-bold">
      {disable ? "no" : title}
    </Text>
  </TouchableOpacity>
);

export default BottomButton;
