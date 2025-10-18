import React from "react";
import styles from "./button.module.css";
import { DSAText } from "..";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  color?: string;
  colorHover?: string;
  padding?: string;
  fontSize?: string;
  iconLeft?: string;
  iconRight?: string;
  iconSize?: number;
  fontWeight?: number;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  className?: string; 
}

const Button = ({
  children,
  variant = "solid",
  color = "#FFFFFF",
  backgroundColor ="rgb(205, 92, 92)",
  colorHover = "#FFFFFF",
  padding = "8px 20px",
  iconLeft,
  iconRight,
  fontSize = "18px",
  iconSize = 20,
  fontWeight = 700,
  width,
  height,
  disabled = false,
  onClick,
  className, 
}: ButtonProps) => {
  const ButtonStyles = {
    "--button-color": disabled ? "rgba(212, 183, 249, 1)" : color,
    "--button-color-hover": disabled ? "rgba(212, 183, 249, 1)" : colorHover,
    backgroundColor: disabled
      ? "#ddd"
      : variant === "solid"
      ? backgroundColor
      : "transparent",
    padding,
    width,
    height,
    "--fontWeight": fontWeight,
    color: disabled ? "#aaa" : color,
  } as React.CSSProperties;

  return (
    <button
      style={ButtonStyles}
      className={`
        ${styles.button} 
        ${styles[`btn-${variant}`]} 
        ${styles.fontWeight} 
        ${className || ""}
      `}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {iconLeft && (
        <img
          src={`/svg/${iconLeft}.svg`}
          alt="icon left"
          width={iconSize}
          height={iconSize}
        />
      )}
      <DSAText fontWeight={fontWeight} fontSize={fontSize} color={color}>
        {children}
      </DSAText>
      {iconRight && (
        <img
          src={`/svg/${iconRight}.svg`}
          alt="icon right"
          width={iconSize}
          height={iconSize}
        />
      )}
    </button>
  );
};

export default Button;
