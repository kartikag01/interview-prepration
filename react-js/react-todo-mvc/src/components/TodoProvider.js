import { createContext, useReducer, useState } from "react";
import ACTION_TYPE, { FILTER_TITLES } from "./../constants";
import TodoContext from "./TodoContext";
import reducer from "./todoReducer";

const initialState = {
  todoList: [],
};

function TodoProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_TITLES[0]);

  const value = {
    todoList: state.todoList,
    selectedFilter: selectedFilter,
    addTodoItem: (todoItemLabel) => {
      dispatch({
        type: ACTION_TYPE.ADD_TODO_ITEM,
        payload: { label: todoItemLabel },
      });
    },
    removeTodoItem: (todoID) => {
      dispatch({
        type: ACTION_TYPE.REMOVE_TODO_ITEM,
        payload: { todoID },
      });
    },
    markAsCompleted: (todoID) => {
      dispatch({
        type: ACTION_TYPE.MARK_COMPLETED,
        payload: { todoID },
      });
    },
    updateTodoItem: (todoID, label) => {
      dispatch({
        type: ACTION_TYPE.UPDATE_TODO_ITEM,
        payload: { todoID, label },
      });
    },
    updateSelectedFilter: (newFlter) => {
      setSelectedFilter(newFlter);
    },
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

export default TodoProvider;
