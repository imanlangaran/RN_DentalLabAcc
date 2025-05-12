import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';

const StyledButton = ({
  selected=false,
  label,
  value,
  onPress,
  className
}:{
  selected?: boolean;
  label: string;
  value: string;
  onPress: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  return (
    <View className={`min-w-56 ${className}`}>
      <TouchableOpacity 
        className={`w-full text-center rounded-full py-2 ${selected ? ' text-white bg-primary ' : ' text-primary bg-secondary'}`}
        onPress={() => onPress(value)}
      >
        {label}
      </TouchableOpacity>
    </View>
  )
}

export default StyledButton