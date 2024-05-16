import { useContext, useState } from "react";
import TodoContext from "./TodoContext";

function TodoTextInput(props) {
  const { defaultValue = "", onSubmit } = props;
  const [value, setValue] = useState(defaultValue);
  const { addTodoItem } = useContext(TodoContext);

  function handleOnChange(e) {
    setValue(e.target.value);
  }

  function handleOnSubmit(e) {
    console.log("e.key", e.key);
    if (e.key === "Enter") {
      // onSubmit not in use, else will work.
      if (onSubmit) {
        onSubmit(value);
      } else {
        addTodoItem(value);
      }
      setValue("");
    }
  }

  return (
    <input
      placeholder="Enter your todo"
      value={value}
      type="text"
      onChange={handleOnChange}
      onKeyDown={handleOnSubmit}
      autoFocus
    />
  );
}

export default TodoTextInput;
