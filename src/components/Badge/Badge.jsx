import "../../styles/badge/badge-styles.css";

const Badge = ({ priority }) => {
  return <div className={`badge ${priority}`}>{priority}</div>;
};

export default Badge;
