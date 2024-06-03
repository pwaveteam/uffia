import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;

  flex-direction: column;
  border-radius: 5px;
  width: 500px;
  height: 260px;
  
  background-color: #ffffff;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

const ButtonWrap = styled.div `
    display:flex;
    flex-direction: row;
    justify-content: end;
`

export const ExitBtn = styled.div `
    // 연한 blue
    color: turquoise;
    font-weight: bold;
    border-radius: 10px;
    text-decoration: none;
    margin: 10px;
    padding: 5px 10px;
    width: 40px;
    height: 40px;
    display : flex;
    justify-content : center;
    align-items : center;

    cursor: pointer;
`;

export const Header = styled.div`
  
    padding-top: 2rem;
    padding-left: 1rem;
    font-size: 1rem;
    color: #8e8e8e;
    white-space: pre-wrap;
`;

export const Text = styled.div`
    padding-top: 2.5rem;
    padding-left: 1rem;
    font-size: 1rem;
    color: #8e8e8e;
    white-space: pre-wrap;
`;

type AdminMenuProps = {
  children: React.ReactNode;
  onClick: ()=> void
};

export const Modal = ({
  children,
  onClick,
}: AdminMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen) 
  };


  return (
    <>
      <ModalContainer>
        <div onClick={openModalHandler}
        > {children}
        </div>
        {isOpen ? 
        <ModalBackdrop onClick={openModalHandler}>
          //event 버블링을 막는 메소드 
            <ModalView onClick={(e) => e.stopPropagation()}>
              <Header>
                다음 질문들을 TSD(액체물성표)를 참고하여
                <br/>
                답변해주시기 바랍니다.
              </Header>

              <Text>
                질문에 답하기 어려우신 경우,
                <br/>
                [다음으로] 버튼을 눌러 다음 질문을 진행하여 주시거나,
                <br/>
                우측 상단 [영업사원과 문의 일정 잡기]를 눌러주시기 바랍니다.
              </Text>
              <ButtonWrap>
              <ExitBtn onClick={
                ()=> {
                  openModalHandler()
                  onClick()
                }
              }>OK</ExitBtn>
              </ButtonWrap>
            </ModalView>
          </ModalBackdrop>
          : null
        }
      </ModalContainer>
    </>
  );
};