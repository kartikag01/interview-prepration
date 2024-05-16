import TodoTextInput from "./TodoTextInput";
import Filters from "./Filters";

function TodoHeader(params) {
  return (
    <header>
      <h1>Your Todos</h1>
      <Filters />
      <TodoTextInput />
    </header>
  );
}

export default TodoHeader;
