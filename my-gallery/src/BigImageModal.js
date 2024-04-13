import { Modal, Pressable, View, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        paddingHorizontal: 20, 
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SimpleLineIcons
        name={iconName}
        size={20}
        color="black"
      />
    </TouchableOpacity>
  )
}
export default ({ 
  modalVisible, 
  onPressBackdrop, 
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal
      animationType="alide"
      transparent={true}
      visible={modalVisible}
    >
      <Pressable 
        onPress={onPressBackdrop} 
        style={{ 
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(155, 155, 155, 0.8)`,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* < 화살표 */}
          <ArrowButton iconName={"arrow-left"} onPress={onPressLeftArrow} disabled={!showPreviousArrow}/>
         
          {/* 이미지 */}
          <Pressable>
            <Image 
              source={{ uri: selectedImage?.uri }} 
              style={{ 
                width: 280, 
                height: 280, 
                backgroundColor: "white"
              }}
              resizeMode="contain"
            />
          </Pressable>
          
          {/* > 화살표 */}
          <ArrowButton iconName={"arrow-right"} onPress={onPressRightArrow} disabled={!showNextArrow}/>
        </View>
      </Pressable>
    </Modal>
  );
}