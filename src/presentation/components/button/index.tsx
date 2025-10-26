import React from "react";
import styles from "./button.module.css";
import { DSAText } from "..";
import { icons, type IconName } from "../../utils/icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  color?: string;
  colorHover?: string;
  padding?: string;
  fontSize?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconSize?: number;
  fontWeight?: number;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  className?: string;
  downloadUrl?: string;
  downloadFilename?: string;
}

const Button = ({
  children,
  variant = "solid",
  color = "#ffffff",
  backgroundColor = "#0284c7",
  colorHover = "#FFFFFF",
  padding = "0.8rem 2rem",
  iconLeft,
  iconRight,
  fontSize = "0.7rem",
  iconSize = 20,
  fontWeight = 700,
  width,
  height,
  disabled = false,
  onClick,
  className,
  downloadUrl,
  downloadFilename,
}: ButtonProps) => {
  const IconLeftComponent = iconLeft ? icons[iconLeft] : null;
  const IconRightComponent = iconRight ? icons[iconRight] : null;

  const ButtonStyles = {
    "--button-color": disabled ? "#475569" : backgroundColor,
    "--button-color-hover": disabled ? "#475569" : colorHover,
    backgroundColor: disabled
      ? "#1e293b"
      : variant === "solid"
      ? backgroundColor
      : "transparent",
    padding,
    width,
    height,
    "--fontWeight": fontWeight,
    color: disabled ? "#64748b" : color,
  } as React.CSSProperties;

  const handleClick = () => {
    if (disabled) return;

    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      if (downloadFilename) {
        link.download = downloadFilename;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      style={ButtonStyles}
      className={`
        ${styles.button} 
        ${styles[`btn-${variant}`]} 
        ${styles.fontWeight} 
        ${className || ""}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {IconLeftComponent && (
        <IconLeftComponent 
          size={iconSize} 
          strokeWidth={2}
          color={disabled ? "#64748b" : color}
        />
      )}
      <DSAText fontWeight={fontWeight} fontSize={fontSize} color={disabled ? "#64748b" : color}>
        {children}
      </DSAText>
      {IconRightComponent && (
        <IconRightComponent 
          size={iconSize} 
          strokeWidth={2}
          color={disabled ? "#64748b" : color}
        />
      )}
    </button>
  );
};

export default Button;