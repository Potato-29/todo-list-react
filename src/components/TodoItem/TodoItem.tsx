import Button from "../Button/Button";
import "../../styles/todo-item/todo-item-styles.css";
import editIcon from "../../assets/icons/edit.png";
import saveIcon from "../../assets/icons/save.png";
import deleteIcon from "../../assets/icons/exit.png";
import { deleteTodo, editTodo, toggleTodo } from "../../services/todoServices";
import { useTodosContext } from "../../context/TodosContext";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../../types/Todo";
import Badge from "../Badge/Badge";
import Deadline from "../Deadline/Deadline";

const TodoItem = ({ id, text, completed, priority, deadline }: Todo) => {
  const { dispatch } = useTodosContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditMode(true);
    setEditedTodo(text);
  };

  const onToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    toggleTodo(dispatch, id);
  };

  const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    editTodo(dispatch, id, editedTodo);
    setIsEditMode(false);
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div
      onClick={(e) => (isEditMode ? () => {} : onToggle(e))}
      className={`todoItem ${completed ? "todoItemComplete" : ""}`}
    >
      <div className={"todoItemContent"}>
        <div className={"checkbox"}>
          {completed && <div className={"checkmark"} />}
        </div>
        {isEditMode ? (
          <input
            ref={inputRef}
            className="editing-todo"
            type="text"
            value={editedTodo}
            onChange={(e) => {
              e.stopPropagation();
              setEditedTodo(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={completed ? "completed-text" : ""}>{text}</span>
        )}
      </div>
      <div className={"todoItemActions"}>
        {deadline && !completed && <Deadline dueDate={deadline} />}
        <Badge priority={priority} />
        {isEditMode ? (
          <Button variant="success" onClick={onSave}>
            <img className="icon" src={saveIcon} alt="Edit" />
          </Button>
        ) : (
          <>
            <Button className="edit-btn" variant="primary" onClick={onEdit}>
              <img className="icon" src={editIcon} alt="Edit" />
            </Button>
            <Button
              className="delete-btn"
              variant="danger"
              onClick={() => deleteTodo(dispatch, id)}
            >
              <img className="icon" src={deleteIcon} alt="Delete" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
