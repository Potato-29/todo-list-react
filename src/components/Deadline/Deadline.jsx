import "../../styles/deadline/deadline-styles.css";

const Deadline = ({ dueDate }) => {
  const calculateDaysLeft = () => {
    const now = new Date();
    const deadline = new Date(dueDate);
    const timeDiff = deadline.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const daysLeft = calculateDaysLeft();

  const getBackgroundColor = () => {
    if (daysLeft <= 3) return "#ca3232";
    if (daysLeft <= 7) return "#eff320";
    return "#32ca32";
  };

  return (
    <div
      className="deadline-badge"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""}` : "Due"}
    </div>
  );
};

export default Deadline;
