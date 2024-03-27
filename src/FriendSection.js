import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default (props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>친구 {props.friendProfileLen}</Text>
      <TouchableOpacity onPress={props.onPress}>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};