import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Platform, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { useGallery } from './src/use-gallery';

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const { images, pickImage } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const renderItem = (({ item: { id, uri }, index }) => {
    const onLongPress = () => { 
      Alert.alert("이미지를 삭제하시겠습니까?");
    };
    return (
      <TouchableOpacity onLongPress={onLongPress}>
        <Image 
          source={{ uri: uri }} 
          style={{ 
            width: columnSize, 
            height: columnSize 
          }}
        />
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Button title='갤러리 열기' onPress={onPressOpenGallery}/>
      <FlatList
        data={images}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});
