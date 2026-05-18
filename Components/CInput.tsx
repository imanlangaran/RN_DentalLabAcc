import { Text, TextInput, TouchableOpacity, View } from "react-native";

const CInput = ({
  label,
  value,
  valueHandler,
  button = false,
  onPress,
}: {
  label: string;
  value: string;
  valueHandler?: (text: string) => void;
  button?: boolean;
  onPress?: () => void;
}) => {
  const className = 'w-full p-2 mt-1 border rounded-3xl border-none bg-secondary outline-none text-center border-secondary text-primary text-xl py-3 ';

  return (
    <View className="w-full flex items-start">
      <Text className="text-black text-xl">{label}</Text>
      {button ? (
        <TouchableOpacity
          className="w-full "
          onPress={onPress}>
          <Text className={className}>
            {value}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          className={className}
          value={value}
          onChangeText={valueHandler}
        />
      )}

    </View>
  );
};

export default CInput;
