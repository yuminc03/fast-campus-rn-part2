import { StyleSheet, Text, Image, FlatList, SafeAreaView, Platform, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { useGallery } from './src/use-gallery';
import MyDropdownPicker from './src/MyDropdownPicker';
import TextInputModal from './src/TextInputModal';
import BigImageModal from './src/BigImageModal';
import ImageList from './src/ImageList';

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const { 
    imagesWithAddButton, 
    pickImage, 
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal, 
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImageModalVisible,
    openBigImageModal,
    closeBigImageModal,
    selectedImage,
    selectImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageID) => deleteImage(imageID);
  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal();
  };
  const onPressWatchAd = () => {
    console.log("load ad");
  };
  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다.", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        }
      ])
    }
    openTextInputModal();
  };
  const onSubmitEditing = () => {
    if (!albumTitle) return;

    // 1. 앨범 타이틀 추가
    addAlbum();
    // 2. Modal 닫기 & TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  };
  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };
  const onPressBigImageModalBackdrop = () => {
    closeBigImageModal();
  };
  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };
  const onPressRightArrow = () => {
    moveToNextImage();
  };

  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onLongPressAlbum = (albumID) => {
    deleteAlbum(albumID);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropdownPicker 
        isDropdownOpen={isDropdownOpen}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범 추가하는 TextInputModal */}
      <TextInputModal
        textInputModalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      {/* 이미지를 크게 보는 Modal */}
      <BigImageModal
        modalVisible={bigImageModalVisible}
        onPressBackdrop={onPressBigImageModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />
      
      {/* 이미지 리스트 */}
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
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
