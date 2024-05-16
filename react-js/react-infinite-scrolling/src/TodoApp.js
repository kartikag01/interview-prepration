import React from "react";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import "./styles.css";

function TodoApp() {
  return (
    <main>
      <TodoHeader />
      <section>
        <TodoList />
      </section>
    </main>
  );
}

export default TodoApp;
