import { TouchableOpacity, View } from "react-native"
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getBottomSpace } from "react-native-iphone-x-helper";

const bottomSpace = getBottomSpace();
const TabButton = ({ 
  isOtherBgColor,
  isSelected, 
  onPress, 
  activeIconName, 
  inactiveIconName, 
  isIconFontisto, 
  isIconIonicons,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      {isIconFontisto && <Fontisto name={ isSelected ? activeIconName : inactiveIconName } size={24} color="black" />}
      {isIconIonicons && <Ionicons name={ isSelected ? activeIconName : inactiveIconName } size={24} color="black" />}
    </TouchableOpacity>
  )
}
export default ({ selectedTabIndex, setSelectedTabIndex }) => {
  return (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      paddingBottom: bottomSpace,
      borderTopWidth: 0.5,
      borderTopColor: "gray",
    }}>
      <TabButton
        isSelected={selectedTabIndex === 0}
        onPress={() => setSelectedTabIndex(0)}
        activeIconName={"person"} 
        inactiveIconName={"persons"}
        isIconFontisto
      />
      <TabButton
        isSelected={selectedTabIndex === 1}
        onPress={() => setSelectedTabIndex(1)}
        activeIconName={"chatbubble"} 
        inactiveIconName={"chatbubble-outline"}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIndex === 2}
        onPress={() => setSelectedTabIndex(2)}
        activeIconName={"pricetag"} 
        inactiveIconName={"pricetag-outline"}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIndex === 3}
        onPress={() => setSelectedTabIndex(3)}
        activeIconName={"add-circle"} 
        inactiveIconName={"add-circle-outline"}
        isIconIonicons
      />
    </View>
  )
}