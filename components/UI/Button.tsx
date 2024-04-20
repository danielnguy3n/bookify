import React, { MouseEventHandler, ReactNode } from "react";
import Loader from "./Loader";

interface ButtonProps {
  icon?: ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  additionalClassName?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  icon,
  loading = false,
  children,
  onClick,
  disabled,
  additionalClassName,
  type
}: ButtonProps) {
  return (
    <button
      className={`btn ${additionalClassName}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      <div className="btn__text">
        {loading ? <Loader /> : <> {children} </>}
      </div>
    </button>
  );
}
