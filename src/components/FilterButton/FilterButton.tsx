import "../../styles/filter-button/filter-button-styles.css";
import { FilterButtonProps } from "../../types/FilterButtonProps";

const FilterButton = ({ text, onClick, active }: FilterButtonProps) => {
  return (
    <button
      className={`filter-button ${active ? "filter-active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterButton;
