import dayjs from "dayjs";
import { useState } from "react"

const defaultTodoList = [
  {
    id: 1,
    content: "운동하기",
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: "공부하기",
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: "RN 강의 수강하기",
    date: dayjs(),
    isSuccess: true,
  },
];

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const len = todoList.length;
    const lastID = len === 0 ? 0 : todoList[len - 1].id;
    const newTodoList = [
      ... todoList,
      {
        id: lastID + 1, 
        content: input,
        date: selectedDate,
        isSuccess: false,
      }
    ];
    setTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const toggleTodo = (id) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ... todo,
        isSuccess: !todo.isSuccess,
      };
    });

    setTodoList(newTodoList);
  };

  const resetInput = () => setInput("");

  return {
    todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput
  };
}