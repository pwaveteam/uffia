import React, { useState } from "react";
import styled from "styled-components";

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
  size?: "small" | "medium" | "large";
};

const Switch = ({ checked, onChange, size = "medium" }: SwitchProps) => {
  const [temp, setTemp] = useState(true);

  return (
    <SwitchWrapper size={size}>
      <SwitchInput
        type="checkbox"
        checked={temp}
        selected={temp}
        onChange={() => {
          setTemp(!temp);
        }}
        size={size}
      />
      <SwitchLabel size={size} />
    </SwitchWrapper>
  );
};

export default Switch;

const SwitchWrapper = styled.label<{ size: "small" | "medium" | "large" }>`
  position: relative;
  display: inline-block;
  width: ${({ size }) =>
    size === "small" ? "2rem" : size === "medium" ? "2.4rem" : "2.8rem"};
  height: ${({ size }) =>
    size === "small" ? "1.2rem" : size === "medium" ? "1.4rem" : "1.6rem"};
`;

const SwitchInput = styled.input<{
  selected: boolean;
  size: "small" | "medium" | "large";
}>`
  display: none;

  &:checked + span {
    background-color: #3e7aff;
  }

  & + span {
    ${({ selected }) => !selected && "opacity: 0.5"};
  }

  &:checked + span:before {
    transform: translateX(
      ${({ size }) =>
        size === "small" ? "0.8rem" : size === "medium" ? "1rem" : "1.2rem"}
    );
  }
`;

const SwitchLabel = styled.span<{ size: "small" | "medium" | "large" }>`
  position: absolute;
  cursor: pointer;
  top: ${({ size }) =>
    size === "small" ? "0.1rem" : size === "medium" ? "0.2rem" : "0.2rem"};
  left: ${({ size }) =>
    size === "small" ? "0.1rem" : size === "medium" ? "0.15rem" : "0.2rem"};
  right: ${({ size }) =>
    size === "small" ? "0.1rem" : size === "medium" ? "0.15rem" : "0.2rem"};
  bottom: ${({ size }) =>
    size === "small" ? "0.1rem" : size === "medium" ? "0rem" : "0.2rem"};
  background-color: #3e7aff;

  border-radius: 1.25rem;
  transition: background-color 0.3s;

  &:before {
    position: absolute;
    content: "";
    height: ${({ size }) =>
      size === "small" ? "0.8rem" : size === "medium" ? "1rem" : "1.2rem"};
    width: ${({ size }) =>
      size === "small" ? "0.8rem" : size === "medium" ? "1rem" : "1.2rem"};
    left: ${({ size }) =>
      size === "small" ? "0.1rem" : size === "medium" ? "0.15rem" : "0.2rem"};
    bottom: ${({ size }) =>
      size === "small" ? "0.1rem" : size === "medium" ? "0.15rem" : "0.2rem"};
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
`;
