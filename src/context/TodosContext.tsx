import React, { createContext, useContext, useEffect, useReducer } from "react";
import { todosReducer } from "./TodosReducer";
import { Todo, TodosContextType, Priority } from "../types/Todo";

const defaultTodos: Todo[] = [
  {
    id: "1",
    text: "Learn React",
    completed: true,
    priority: Priority.LOW,
    deadline: "2024-01-01",
  },
  {
    id: "2",
    text: "Build a Todo App",
    completed: false,
    priority: Priority.LOW,
    deadline: "2024-01-01",
  },
  {
    id: "3",
    text: "Master TypeScript",
    completed: false,
    priority: Priority.LOW,
    deadline: "2024-01-01",
  },
];

const loadFromStorage = () => {
  const storedState = localStorage.getItem("todos");
  return storedState
    ? JSON.parse(storedState)
    : {
        todos: defaultTodos,
        filter: "ALL",
        search: "",
        past: [],
        future: [],
      };
};
const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    todosReducer,
    {
      todos: defaultTodos,
      filter: "ALL",
      search: "",
      past: [],
      future: [],
    },
    loadFromStorage
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
