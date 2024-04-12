import { Modal, Pressable, View, Image } from "react-native";

export default ({ modalVisible, onPressBackdrop, selectedImage }) => {
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
          // backgroundColor: "lightblue",
          // opacity: 0.8,
          backgroundColor: `rgba(115, 155, 115, 0.8)`,
        }}
      >
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
      </Pressable>
    </Modal>
  );
}