import React from "react";
import styled from "styled-components";

type TextareaProps = {
  label?: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = ({
  label,
  value,
  rows,
  onChange,
  ...props
}: TextareaProps) => {
  return (
    <TextareaWrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <TextareaInput
          rows={rows || 1}
          value={value}
          onChange={onChange}
          {...props}
        />
      </InputWrapper>
    </TextareaWrapper>
  );
};

export default Textarea;

const TextareaWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const TextareaInput = styled.textarea`
  width: 100%;
  min-height: 44px;

  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
`;
