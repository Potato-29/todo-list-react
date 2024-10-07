import "../../styles/navbar/navbar-styles.css";
import FilterButton from "../FilterButton/FilterButton";
import Searchbar from "../Searchbar/Searchbar";
import { useTodosContext } from "../../context/TodosContext";
import { Priority } from "../../types/Todo";
import Button from "../Button/Button";

const Navbar = () => {
  const { dispatch, filter, priority } = useTodosContext();

  const setFilter = (newFilter: "ALL" | "COMPLETE" | "INCOMPLETE") => {
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  const setPriority = (newPriority: Priority | undefined) => {
    dispatch({ type: "SET_PRIORITY", payload: newPriority });
  };

  return (
    <div className="navbar">
      <h1 className="navbar-title">Today</h1>
      <Searchbar dispatch={dispatch} />
      <div className="filter-buttons">
        <FilterButton
          text="All"
          onClick={() => setFilter("ALL")}
          active={filter === "ALL"}
        />
        <FilterButton
          text="Completed"
          onClick={() => setFilter("COMPLETE")}
          active={filter === "COMPLETE"}
        />
        <FilterButton
          text="Incomplete"
          onClick={() => setFilter("INCOMPLETE")}
          active={filter === "INCOMPLETE"}
        />
        <select
          id="priority-select"
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="priority-select"
          value={priority}
        >
          <option value={Priority.ALL}>Priority</option>
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>
        {/* <FilterButton text="Reset Filter" /> */}
        <Button
          className="reset-btn"
          variant="danger"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
