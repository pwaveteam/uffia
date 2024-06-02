import React from "react";
import styled from "styled-components";
import { HEADER_HEIGHT } from "./Header";
import Icon from "../module/Icon";

type LeftMenuProps = {
  children: React.ReactNode;
};

const LeftMenu = ({ children }: LeftMenuProps) => {
  return (
    <LeftMenuContainer>
      <Menu>
        <SubMenus>견적시스템</SubMenus>
        <MenuItem
          onClick={() => {
            window.location.href = "/regis/0";
          }}
        >
          <Icon icon="loading" width={30} />
          자동 견적
          <Icon icon="new" width={40} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.location.href = "/bom/detail/20";
          }}
        >
          <Icon icon="directory" width={30} />내 견적함
        </MenuItem>

        <SubMenus>고객지원</SubMenus>
        <MenuItem
          onClick={() => {
            window.location.href = "http://www.banseok.co.kr/kor/product";
          }}
        >
          <Icon icon="list" width={30} />
          제품소개
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.location.href =
              "http://www.banseok.co.kr/kor/about/company.html";
          }}
        >
          <Icon icon="headset" width={30} />
          제휴/협력
        </MenuItem>
      </Menu>
      {children}
    </LeftMenuContainer>
  );
};

export default LeftMenu;

const LeftMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const Menu = styled.div`
  min-width: 15rem;

  background-color: #132533;
  color: white;
  display: flex;
  flex-direction: column;

  padding-top: 2rem;
`;

const SubMenus = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  padding: 0 2rem;
  height: 3rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 3rem;

  font-size: 1rem;
  padding: 0 2rem;
  cursor: pointer;
  &:hover {
    background-color: #061016;
  }
`;
