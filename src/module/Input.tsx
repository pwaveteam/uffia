import { ChangeEvent } from "react";
import styled from "styled-components";

type InputProps = {
  type?: string;
  placeholder: string;
  name?: string;
  value: string;
  max?: number;
  min?: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ min, ...props }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (props.type === "number") {
      const numberValue = Number(value);
      if (props.max && numberValue > props.max) {
        e.target.value = String(props.max);
        props.onChange(e);
        return;
      }

      if (typeof min === "number" && numberValue < min) {
        e.target.value = String(min);
        props.onChange(e);
        return;
      }
    }

    props?.onChange(e);
  };

  return (
    <Container>
      <InputComponent {...props} onChange={handleChange} />
    </Container>
  );
};

export default Input;

const Container = styled.div``;

const InputComponent = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: #333;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #333;
  }
`;
