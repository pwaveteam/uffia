import React from "react";
import styled from "styled-components";
import { HEADER_HEIGHT } from "./Header";
import Icon from "../module/Icon";

type AdminMenuProps = {
  children: React.ReactNode;
};

const AdminMenu = ({ children }: AdminMenuProps) => {
  return (
    <AdminMenuContainer>
      <Menu>
        <SubMenus>Admin</SubMenus>
        <MenuItem
          onClick={() => {
            window.location.href = "/bom/detail/20";
          }}
        >
          <Icon icon="settings" width={30} />
          BOM
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.location.href = "/db-system/list";
          }}
        >
          <Icon icon="copy" width={30} />
          DB System
        </MenuItem>
      </Menu>
      {children}
    </AdminMenuContainer>
  );
};

export default AdminMenu;

const AdminMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const Menu = styled.div`
  min-width: 15rem;

  background-color: #3a3a3a;
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
    background-color: #232323;
  }
`;
