import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

import { ITEM_WIDTH, statusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

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
    todoList,
    input,
    setInput,
  } = useTodoList(selectedDate);
  const columns = getCalendarColumns(selectedDate);
  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;

  useEffect(() => {
    // runPracticeDayjs();
    // console.log('columns', columns);
    console.log("Changed selectedDate: ", dayjs(selectedDate).format("YYYY.MM.DD."));
  }, [selectedDate]);

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}
      />
      <Margin height={15}/>
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center",
        }}
      />
      <Margin height={15}/>
    </View>
  );

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    return (
      <View
        style={{ 
          flexDirection: "row",
          width: ITEM_WIDTH,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
          // backgroundColor: todo.id % 2 === 0 ? "pink" : "lightblue",
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>{todo.content}</Text>
        <Ionicons name="checkmark" size={17} color={isSuccess ? "#595959" : "#bfbfbf" }/>
      </View>
    );
  };

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
        data={todoList}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        renderItem={renderItem}
      />

      <AddTodoInput
        value={input}
        onChangeText={setinput}
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
