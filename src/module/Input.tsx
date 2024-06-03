import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { alertAtom } from "../store/atom/alert";

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
  const setAlert = useSetRecoilState(alertAtom);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (props.type === "number") {
      const numberValue = Number(value);
      if (props.max && numberValue > props.max) {
        e.target.value = String(props.max);
        props.onChange(e);

        setAlert({
          isShow: true,
          content: "죄송합니다. 해당 값은 입력이 불가합니다.\n자세한 내용은 영업사원에게 문의바랍니다.\n다음질문으로 넘어가 주세요",
        });
        return;
      }

      if (typeof min === "number" && numberValue < min) {
        e.target.value = String(min);
        props.onChange(e);

        setAlert({
          isShow: true,
          content:  "죄송합니다. 해당 값은 입력이 불가합니다.\n자세한 내용은 영업사원에게 문의바랍니다.\n다음질문으로 넘어가 주세요",
        });
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
