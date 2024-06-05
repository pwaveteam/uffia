import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "uffia";
};

const Button = ({ text, onClick, style, size, variant }: ButtonProps) => {
  return (
    <Container
      style={{
        color: "white",
        backgroundColor: "#666666",
        ...style,
      }}
      size={size || "medium"}
      variant={variant || "primary"}
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
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.4rem;
  border-radius: 0.25rem;
  font-weight: formal;
  color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  background-color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "#005cff !important";
      case "secondary":
        return "#8e8e8e !important";
      case "uffia":
        return "#313f5b !important";
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.75rem";
      case "medium":
        return "1rem";
      case "large":
        return "1.25rem";
    }
  }};
`;
