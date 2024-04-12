import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const defaultAlbum = {
  id: 1,
  title: "기본",
}

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const lastID = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastID + 1,
        uri: result.assets[0].uri,
        albumID: selectedAlbum.id,
      }

      setImages([... images, newImage]);
    }
  };

  const deleteImage = (imageID) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "" , [
      {
        style: "cancel",
        text: "아니요"
      },
      {
        text: "예",
        onPress: () => {
          const newImages = images.filter(image => image.id !== imageID)
          setImages(newImages)
        }
      }
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImageModal = () => setBigImageModalVisible(true);
  const closeBigImageModal = () => setBigImageModalVisible(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastID = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastID + 1,
      title: albumTitle,
    };

    setAlbums([
      ... albums, 
      newAlbum
    ]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumID) => {
    if (albumID === defaultAlbum.id) {
      Alert.alert("기본 앨범은 삭제할 수 없습니다.");
      return;
    }

    Alert.alert("이미지를 삭제하시겠습니까?", "" , [
      {
        style: "cancel",
        text: "아니요"
      },
      {
        text: "예",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumID);
          setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        }
      }
    ]);
  };

  const resetAlbumTitle = () => setAlbumTitle("");

  const selectImage = (image) => {
    setSelectedImage(image);
  };
  const moveToPreviousImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
    const previousImageIndex = selectedImageIndex - 1;
    if (previousImageIndex < 0) return;
    const previousImage = filteredImages[previousImageIndex];
    setSelectedImage(previousImage);
  };
  const moveToNextImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
    const nextImageIndex = selectedImageIndex + 1;
    if (nextImageIndex > filteredImages.length - 1 || previousImageIndex === -1) return;
    const nextImage = filteredImages[nextImageIndex];
    setSelectedImage(nextImage);
  };

  // selectedImage는 null일 가능성 있음
  const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== 0;
  const showNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== filteredImages.length - 1;
  const filteredImages = images.filter((image) => image.albumID === selectedAlbum.id);
  const imagesWithAddButton = [
    ... filteredImages,
    {
      id: -1,
      uri: "",
    } // 한 개 차지하는 양만 중요함
  ]

  return {
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
  };
};