import { Text, TextInput, View } from "react-native";

const CInput = ({
  label,
  InputValue,
  InputValueHandler
}: {
  label: string;
  InputValue: string;
  InputValueHandler: (e: { nativeEvent: { text: string } }) => void;
}) => {
  return (
    <View className="w-full flex items-start">
      <Text className="text-black text-xl">{label}</Text>
      <TextInput
        className="w-full p-2 mt-1 border rounded-3xl border-none bg-secondary outline-none text-center border-secondary text-primary text-xl py-3 "
        value={InputValue}
        onChange={InputValueHandler}
      />
    </View>
  );
};

export default CInput;