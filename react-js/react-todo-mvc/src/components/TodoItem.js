import { useContext, useState } from "react";
import TodoContext from "./TodoContext";
import TodoTextInput from "./TodoTextInput";

function TodoItem(props) {
  const [editing, setEditing] = useState(false);

  const { todoItem } = props;
  const { id, label, completed } = todoItem;
  const { removeTodoItem, markAsCompleted, updateTodoItem } =
    useContext(TodoContext);

  return (
    <li>
      <div>
        {!editing ? (
          <label className={completed ? "completed" : ""}>{label}</label>
        ) : (
          <TodoTextInput
            defaultValue={label}
            onSubmit={(newLabel) => {
              updateTodoItem(id, newLabel);
              setEditing(false);
            }}
          />
        )}
        <button onClick={() => setEditing(true)}>Modify</button>
        <button onClick={() => markAsCompleted(id)}>Completed</button>
        <button onClick={() => removeTodoItem(id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;