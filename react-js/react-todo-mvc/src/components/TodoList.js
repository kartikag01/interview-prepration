import { useContext, useState } from "react";
import { FILTER_TITLES } from "../constants";
import TodoContext from "./TodoContext";
import TodoItem from "./TodoItem";

function TodoList(params) {
  const { todoList, selectedFilter } = useContext(TodoContext);
  return (
    <ul>
      {todoList
        .filter((_) => {
          if (selectedFilter === FILTER_TITLES[0]) {
            return true;
          } else if (selectedFilter === FILTER_TITLES[1]) {
            return _.completed === false;
          } else if (selectedFilter === FILTER_TITLES[2]) {
            return _.completed === true;
          }
        })
        .map((todoItem) => (
          <TodoItem todoItem={todoItem} key={todoItem.id} />
        ))}
    </ul>
  );
}

export default TodoList;
