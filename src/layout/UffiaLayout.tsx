import styled from "styled-components";

import React from "react";
import Icon from "../module/Icon";
import { useLocation } from "react-router-dom";

type UffiaLayoutProps = {
  children: React.ReactNode;
};

const MENU = [
  {
    name: "제안서 관리",
    path: "/uffia/ai-content",
  },
  {
    name: "디자인 컨텐츠 관리",
    path: "/uffia/ai-design",
  },
  {
    name: "내역 관리",
  },
  {
    name: "컨텐츠 관리",
  },
  {
    name: "고객지원",
  },
  {
    name: "기술 자료",
  },
  {
    name: "설정",
  },
];

const UffiaLayout = ({ children }: UffiaLayoutProps) => {
  const location = useLocation();
  const { pathname } = location;

  const currentName = MENU.find((menu) => menu.path === pathname)?.name;

  return (
    <DefaultLayoutWrap>
      <Header>
        <HeaderLogo>
          <Img
            src="/logo/uffiaLogo.svg"
            alt="logn"
            onClick={() => {
              window.location.href = "/regis/0";
            }}
          />
        </HeaderLogo>
        <HeaderLeft>
          <HeaderButton>1:1 문의</HeaderButton>
          <HeaderButton>FTP</HeaderButton>
          <HeaderButton>HELP</HeaderButton>
          <IconWrapper>
            <Icon icon="user" width={30} />
          </IconWrapper>
        </HeaderLeft>
      </Header>
      <RouteMenu>
        {MENU.map((menu, index) => (
          <MenuContainer
            key={index}
            selected={menu.path === pathname}
            onClick={() => {
              if (menu.path) {
                // react-router-dom의 Link 컴포넌트를 사용하면 더 좋습니다.
                window.location.href = menu.path;
              }
            }}
          >
            {menu.name}
          </MenuContainer>
        ))}
      </RouteMenu>
      <BreadCrumb>
        <FirstCrumb>{"AI 관리자"}</FirstCrumb>
        <span>{">"}</span>
        <SecondCrumb>{currentName}</SecondCrumb>
      </BreadCrumb>
      {children}
    </DefaultLayoutWrap>
  );
};

export default UffiaLayout;

const Header = styled.div`
  height: 4rem;
  background-color: #313f5b;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.div`
  color: white;
  font-size: 1.5rem;
  padding: 0 5rem;
  display: flex;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-right: 3rem;
`;

const HeaderButton = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: #3e7aff;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 3rem;
  &:hover {
    cursor: pointer;
    color: #3e7aff;
  }
`;

const DefaultLayoutWrap = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
`;

const RouteMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 7rem;
  font-size: 1.25rem;
`;

const MenuContainer = styled.div<{
  selected: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #313f5b;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #3e7aff;
  }

  ${({ selected }) =>
    selected &&
    `
    background-color: #3e7aff;
  `}
`;

const BreadCrumb = styled.div`
  height: 3rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  gap: 0.25rem;
  color: #8e8e8e;
`;

const FirstCrumb = styled.div`
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
    color: #3e7aff;
  }
`;

const SecondCrumb = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #636363;
`;

const Img = styled.img`
  height: 28px;
  cursor: pointer;
`;
