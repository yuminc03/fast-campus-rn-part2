import { KeyboardAvoidingView, Modal, Platform, SafeAreaView, TextInput, View } from "react-native";

export default ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing }) => {
  return (
    <Modal
      animationType="alide"
      transparent={true}
      visible={modalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ width: "100%", position: 'absolute', bottom: 0 }}>
            <TextInput 
              placeholder="앨범명을 입력해주세요" 
              style={{ width: "100%", backgroundColor: "lightblue" }}
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
            />
          </SafeAreaView>
        </View>  
      </KeyboardAvoidingView>
    </Modal>
  );
}