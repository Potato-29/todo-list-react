import "../../styles/searchbar/searchbar-styles.css";
const Searchbar = ({ dispatch }: { dispatch: React.Dispatch<any> }) => {
  return (
    <input
      className="searchbar"
      onChange={(e) => {
        const searchText = e.target.value;
        dispatch({ type: "SET_SEARCH", payload: searchText });
      }}
      type="text"
      placeholder="Search"
    />
  );
};

export default Searchbar;
