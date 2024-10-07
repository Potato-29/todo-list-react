import "../../styles/button/button-styles.css";
import { ButtonProps } from "../../types/ButtonProps";

const Button = ({
  variant = "primary",
  id = "",
  isActive,
  onClick,
  children,
  className = "",
}: ButtonProps) => {
  const buttonClassName = `button ${variant} ${
    isActive ? "active" : ""
  } ${className}`;

  return (
    <button id={id} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
