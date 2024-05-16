import ACTION_TYPE from "./../constants";

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.ADD_TODO_ITEM:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            label: payload.label,
            id: Date.now(),
            completed: false,
          },
        ],
      };
      break;
    case ACTION_TYPE.REMOVE_TODO_ITEM:
      const filterTodoList = state.todoList.filter(
        (todo) => todo.id !== payload.todoID
      );
      return {
        ...state,
        todoList: filterTodoList,
      };
      break;
    case ACTION_TYPE.MARK_COMPLETED:
      const updateTodoList = state.todoList.map((todo) => {
        if (todo.id !== payload.todoID) {
          return todo;
        } else {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
      });
      return {
        ...state,
        todoList: updateTodoList,
      };
      break;
    case ACTION_TYPE.UPDATE_TODO_ITEM:
      const modifiedTodoList = state.todoList.map((todo) => {
        if (todo.id !== payload.todoID) {
          return todo;
        } else {
          return {
            ...todo,
            label: payload.label,
          };
        }
      });
      return {
        ...state,
        todoList: modifiedTodoList,
      };
      break;
    default:
      throw new Error("action is not implemented");
  }
}

export default reducer;
