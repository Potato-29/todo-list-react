import "./App.css";
import AddTask from "./components/AddTask/AddTask";
import Navbar from "./components/Navbar/Navbar";
import TodoItem from "./components/TodoItem/TodoItem";
import { useTodosContext } from "./context/TodosContext";
import { Priority } from "./types/Todo";

function App() {
  const { todos, filter, priority, search } = useTodosContext();
  const filteredTodos = todos.filter((todo) => {
    const filterMatch =
      filter === "ALL" ||
      (filter === "COMPLETE" && todo.completed) ||
      (filter === "INCOMPLETE" && !todo.completed);

    let priorityMatch = !priority || todo.priority === priority;
    if (priority === Priority.ALL) {
      priorityMatch = true;
    }
    const searchMatch = todo.text.toLowerCase().includes(search.toLowerCase());

    return filterMatch && priorityMatch && searchMatch;
  });
  return (
    <div className="layout">
      <Navbar />
      <div className="todos-container">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
      <AddTask />
    </div>
  );
}

export default App;
