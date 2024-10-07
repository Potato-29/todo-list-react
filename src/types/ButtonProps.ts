export interface ButtonProps {
  variant?:
    | "primary"
    | "transparent"
    | "black"
    | "secondary"
    | "danger"
    | "success";
  isActive?: boolean;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
}
