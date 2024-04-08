import React from "react";
import { TextInput, View } from "react-native";
import { bottomSpace } from "./util";

export default ({ value, onChangeText, }) => {
  return (
    <View style={{ marginBottom: bottomSpace }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          backgroundColor: "yellow",
        }}
      />
    </View>
  );
};