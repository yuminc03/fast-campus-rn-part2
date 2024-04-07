import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { getCalendarColumns, getDayColor, getDayText } from './src/util';
import { runPracticeDayjs } from './src/practice-dayjs';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';

const statusBarHeight = getStatusBarHeight(true);
const columnSize = 35;

export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const { 
    todoList
  } = useTodoList(selectedDate);
  const columns = getCalendarColumns(selectedDate);
  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD.");
    return (
      <View>
        {/* < YYYY.MM.DD. > */}
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow}/>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: "#404040"}}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow}/>
        </View>

        {/* 일 ~ 토 */}
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column 
                key={`day-${day}`} 
                text={dayText} 
                color={color} 
                opacity={1}
                disabled={true}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const Column = ({
    text,
    color,
    opacity,
    disabled,
    onPress,
    isSelected,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{ 
          width: columnSize, 
          height: columnSize,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isSelected ? "#c2c2c2" : "transparent",
          borderRadius: columnSize / 2,
        }}
      >
        <Text
          style={{
            color: color,
            opacity: opacity,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const ArrowButton = ({ iconName, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <SimpleLineIcons name={iconName} size={15} color="#404040" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const onPress = () => {
      setSelectedDate(date);
    };
    const isSelected = dayjs(date).isSame(selectedDate, "date");
    return (
      <Column 
        text={dateText} 
        color={color} 
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      />
    );
  };

  useEffect(() => {
    // runPracticeDayjs();
    // console.log('columns', columns);
    console.log("Changed selectedDate: ", dayjs(selectedDate).format("YYYY.MM.DD."));
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Image 
        source={{
          // 출처: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.html
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: 'absolute',
        }}
      />
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column${index}`}
        numColumns={7}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        ListHeaderComponent={ListHeaderComponent}
      />
      <FlatList
        data={todoList}
        // ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item: todo }) => {
          return (
            <Text>{todo.content}</Text>
          );
        }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
