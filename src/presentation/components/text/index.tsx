import React from "react";
import styles from "./text.module.css";

type Variant =
  | "80"
  | "56"
  | "23"
  | "20"
  | "34"
  | "64"
  | "18"
  | "42"
  | "50"
  | "16"
  | "40"
  | "28"
  | "18";;


interface IProps {
  children: React.ReactNode;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
  lineHeight?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
  variant?: Variant;
}

const Text = ({
  children,
  color,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  style = {},
  variant,
}: IProps) => {
  return (
    <p
      className={`${styles.fontSize} ${
        variant ? styles[`font-${variant}`] : ""
      }`}
      style={{
        fontWeight,
        fontSize,
        color,
        lineHeight: lineHeight ? `${lineHeight}px` : undefined,
        letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default Text;
