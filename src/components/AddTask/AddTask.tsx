import Button from "../Button/Button";
import "../../styles/add-task/add-task-styles.css";
import { addTodo } from "../../services/todoServices";
import { useTodosContext } from "../../context/TodosContext";
import { useState } from "react";
import { Priority } from "../../types/Todo";
const AddTask = () => {
  const [todo, setTodo] = useState<string>();
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [deadline, setDeadline] = useState<string>();
  const { dispatch } = useTodosContext();

  const onAdd = () => {
    if (todo === undefined || todo === "") {
      alert("Todo can't be empty!");
      return;
    }
    addTodo(dispatch, todo, priority, deadline);
    setTodo("");
    setPriority(Priority.LOW);
    setDeadline("");
  };

  return (
    <div className="add-task-container">
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Type something to do"
        value={todo}
        className="add-task-input"
      />
      <div className="action-buttons-container">
        <Button
          id="add-task-button"
          className="w-full"
          onClick={() => onAdd()}
          variant="black"
        >
          Add Task
        </Button>
        <div className="undo-redo-buttons">
          <input type="date" onChange={(e) => setDeadline(e.target.value)} />
          <select
            id="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="priority-select"
          >
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
          </select>
          <Button
            className="undo-btn"
            onClick={() => dispatch({ type: "UNDO" })}
          >
            Undo
          </Button>
          <Button
            className="redo-btn"
            onClick={() => dispatch({ type: "REDO" })}
          >
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
