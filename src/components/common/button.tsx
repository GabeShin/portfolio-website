import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "transparent";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonType?: ButtonVariant;
  // Add other custom props if needed
}

const Button: React.FC<ButtonProps> = ({
  label,
  buttonType = "solid",
  ...rest
}) => {
  // Classes common to both button types
  let baseClasses = "py-2 px-4 rounded text-white";

  // Classes specific to button type
  let typeClasses =
    buttonType === "solid"
      ? "bg-blue-500 hover:bg-blue-700"
      : "bg-transparent border border-blue-500 text-blue-500";

  return (
    <button className={`${baseClasses} ${typeClasses}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
