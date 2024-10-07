import { Priority } from "../types/Todo";

const dispatchWithHistory = (dispatch: React.Dispatch<any>, action: any) => {
  dispatch({ type: "PUSH_TO_PAST" });
  dispatch(action);
  dispatch({ type: "CLEAR_FUTURE" });
};

export const addTodo = (
  dispatch: React.Dispatch<any>,
  text: string | undefined,
  priority: Priority,
  deadline: string | undefined
): void => {
  dispatchWithHistory(dispatch, {
    type: "ADD_TODO",
    payload: { text, priority, deadline },
  });
};

export const toggleTodo = (dispatch: React.Dispatch<any>, id: string): void => {
  dispatchWithHistory(dispatch, { type: "TOGGLE_TODO", payload: id });
};

export const editTodo = (
  dispatch: React.Dispatch<any>,
  id: string,
  newText: string
): void => {
  dispatchWithHistory(dispatch, {
    type: "EDIT_TODO",
    payload: { id, text: newText },
  });
};

export const deleteTodo = (dispatch: React.Dispatch<any>, id: string): void => {
  dispatchWithHistory(dispatch, { type: "REMOVE_TODO", payload: id });
};

export const setFilter = (
  dispatch: React.Dispatch<any>,
  filter: "ALL" | "COMPLETE" | "INCOMPLETE"
): void => {
  dispatch({ type: "SET_FILTER", payload: filter });
};
