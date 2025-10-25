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
  // Nuevas propiedades para descarga
  downloadUrl?: string;
  downloadFilename?: string;
}

const Button = ({
  children,
  variant = "solid",
  color = "#ffffffff",
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
  const ButtonStyles = {
    "--button-color": disabled ? "#3094c7ff" : color,
    "--button-color-hover": disabled ? "#3094c7ff" : colorHover,
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

  const handleClick = () => {
    if (disabled) return;

    // Si hay URL de descarga, ejecutar la descarga
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

    // Ejecutar onClick adicional si existe
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
          src={`assets/svg/${iconRight}.svg`}
          alt="icon right"
          width={iconSize}
          height={iconSize}
        />
      )}
    </button>
  );
};

export default Button;