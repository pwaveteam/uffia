import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "uffia";
  outline?: boolean;
};

const Button = ({
  text,
  onClick,
  style,
  size,
  variant,
  outline = false,
}: ButtonProps) => {
  return (
    <Container
      style={{
        ...style,
      }}
      size={size || "medium"}
      variant={variant || "primary"}
      outline={outline}
      onClick={(e) => onClick && onClick(e)}
    >
      {text}
    </Container>
  );
};

export default Button;

const Container = styled.div<{
  size: "small" | "medium" | "large";
  variant: "primary" | "secondary" | "uffia";
  outline: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.4rem;
  border-radius: 0.25rem;
  font-weight: formal;
  color: white;
  ${({ size }) => {
    if (size === "small") {
      return `
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      `;
    } else if (size === "large") {
      return `
        font-size: 1.25rem;
        padding: 0.75rem 2rem;
      `;
    }
  }}
  ${({ variant }) => {
    if (variant === "primary") {
      return `
        background-color: #3e7aff;
        color: white;
      `;
    } else if (variant === "secondary") {
      return `
        background-color: #8e8e8e;
        color: white;
      `;
    } else if (variant === "uffia") {
      return `
        background-color: #313f5b;
        color: white;
      `;
    }
  }}
      ${({ outline, variant }) => {
    if (outline) {
      return `
        background-color: white;
        color: ${
          variant === "primary"
            ? "#3e7aff"
            : variant === "secondary"
            ? "#8e8e8e"
            : "#313f5b"
        };
        border: 1px solid ${
          variant === "primary"
            ? "#3e7aff"
            : variant === "secondary"
            ? "#8e8e8e"
            : "#313f5b"
        };
      `;
    }
  }};
`;

/*
color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  background-color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "#3e7aff !important";
      case "secondary":
        return "#8e8e8e !important";
      case "uffia":
        return "#313f5b !important";
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "1rem";
      case "medium":
        return "1.25rem";
      case "large":
        return "1.5rem";
    }
  }};*/
