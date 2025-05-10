import StyledRadio from "@/Components/StyledRadio";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const NewDoctor = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  },[value])

  return (
    <>
      <StyledRadio 
        label="label1"
        onPress={setValue}
        value="val1"
      />
    </>
  )
};

export default NewDoctor;
