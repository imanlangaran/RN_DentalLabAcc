import { Text, TouchableOpacity } from "react-native";

const BottomButton = ({
  title,
  onPress,
  disable = false,
  disabledText,
  className = ''
}: {
  title: string;
  onPress: () => void;
  disable: boolean;
  disabledText: string;
  className?: string;
}) => (
  <TouchableOpacity
    className={`bg-blue-500 rounded-full w-full shadow-md active:opacity-80 ${className}`}
    onPress={onPress}
  >
    <Text className="text-white text-center text-base font-bold">
      {disable ? disabledText : title}
    </Text>
  </TouchableOpacity>
);

export default BottomButton;
