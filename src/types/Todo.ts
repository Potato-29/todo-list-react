export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  deadline: string;
}
export interface TodosContextType {
  todos: Todo[];
  filter: "ALL" | "COMPLETE" | "INCOMPLETE";
  search: string;
  past: TodosState[];
  future: TodosState[];
  priority: Priority;
  dispatch: React.Dispatch<any>;
}

export type TodoAction =
  | {
      type: "ADD_TODO";
      payload: { text: string; priority: Priority; deadline: string };
    }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: string }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "PUSH_TO_PAST" }
  | { type: "CLEAR_FUTURE" }
  | { type: "SET_FILTER"; payload: "ALL" | "COMPLETE" | "INCOMPLETE" }
  | { type: "SET_PRIORITY"; payload: Priority }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "RESET" };

export interface TodosState {
  todos: Todo[];
  filter: "ALL" | "COMPLETE" | "INCOMPLETE";
  priority: Priority;
  search: string;
  past: TodosState[];
  future: TodosState[];
}

export enum Priority {
  ALL = "all",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
