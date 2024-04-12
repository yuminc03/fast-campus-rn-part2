import { StyleSheet, Text, View, Button, Image, FlatList, SafeAreaView, Platform, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { useGallery } from './src/use-gallery';
import MyDropdownPicker from './src/MyDropdownPicker';
import TextInputModal from './src/TextInputModal';
import BigImageModal from './src/BigImageModal';

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
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageID) => deleteImage(imageID);
  const onPressAddAlbum = () => {
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

  const renderItem = (({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity 
          onPress={onPressOpenGallery}
          style={{ 
            width: columnSize, 
            height: columnSize, 
            backgroundColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Text style={{ fontWeight: '100', fontSize: 45 }}>+</Text>
      </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
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
        onPressBackdrop={closeTextInputModal}
      />

      {/* 이미지를 크게 보는 Modal */}
      <BigImageModal/>

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
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
