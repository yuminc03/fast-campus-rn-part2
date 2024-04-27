import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

import { COLOR } from './color';
import { useTheme } from "./use-theme";

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setsIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setsIsBookmarked(!isBookmarked);

  return {
    isBookmarked,
    toggleIsBookmarked
  }
};

export default ({
  NEWCOLOR,
  size,
  isBookmarked: isBookmarkedProp,
  onPress,
  style,
}) => {
  const {
    isBookmarked,
    toggleIsBookmarked
  } = useBookmark(isBookmarkedProp);
  
  return (
    <TouchableOpacity 
      style={style} 
      onPress={() => {
        toggleIsBookmarked();
        onPress();
      }}
    >
      <Ionicons 
        name="star" 
        size={size} 
        color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4}
      />
    </TouchableOpacity>
  );
}