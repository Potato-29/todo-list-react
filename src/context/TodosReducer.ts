import { Priority, TodoAction, TodosState } from "../types/Todo";

export const todosReducer = (
  state: TodosState,
  action: TodoAction
): TodosState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload.text,
            completed: false,
            priority: action.payload.priority,
            deadline: action.payload.deadline,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_PRIORITY":
      return {
        ...state,
        priority: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "UNDO":
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...previous,
        past: newPast,
        future: [state, ...state.future],
      };

    case "REDO":
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        ...next,
        past: [...state.past, state],
        future: newFuture,
      };
    case "PUSH_TO_PAST":
      return {
        ...state,
        past: [...state.past, { ...state, past: [], future: [] }],
      };

    case "CLEAR_FUTURE":
      return {
        ...state,
        future: [],
      };
    case "RESET":
      return {
        ...state,
        filter: "ALL",
        priority: Priority.ALL,
        search: "",
      };
    default:
      return state;
  }
};
