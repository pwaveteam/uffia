import styled from "styled-components";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { alertAtom } from "../../store/atom/alert";

const Wrap = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
`;

const Body = styled.div`
  color: #666;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 1rem 1.9rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: white;
`;

const Content = styled.p`
  font-size: 1rem;
  padding-bottom: 1rem;
`;

const Button = styled.button`
  float: right;
  background-color: white;
  border: none;
  color: cornflowerblue;
  font-size: 1rem;
  cursor: pointer;
`;
const Index = ({ content }: any) => {
  const resetAlert = useResetRecoilState(alertAtom);

  const closeAlert = () => {
    resetAlert();
  };

  return (
    <Wrap>
      <Body>
        <Content>{content}</Content>
        <Button
          onClick={(e: any) => {
            e.stopPropagation();
            closeAlert();
          }}
        >
          닫기
        </Button>
      </Body>
    </Wrap>
  );
};

export default Index;
