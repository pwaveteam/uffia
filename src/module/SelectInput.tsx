// SelectInput.js
import React from "react";
import styled from "styled-components";

type SelectInputProps = {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({ label, options, value, onChange }: SelectInputProps) => {
  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectWrapperWithIcon>
        <Select value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </SelectWrapperWithIcon>
    </SelectWrapper>
  );
};

export default SelectInput;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const SelectWrapperWithIcon = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    width: 16px;
    height: 16px;
    background-image: url("/icon/dropdown-icon.png"); /* 이미지 경로 */
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  color: #8e8e8e;

  padding-right: 2rem; /* Add space for the dropdown icon */
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  appearance: none; /* Remove default arrow */
  width: 100%;
`;
