import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../module/button";
import ContentHeader from "./ContentHeader";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import AdminMenu from "./AdminMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UffiaLayout from "./UffiaLayout";

const DefaultLayout = () => {
  const targetRef = useRef(null);

  const location = useLocation();
  const { pathname } = location;

  const isRegisPage = pathname.includes("regis");
  const isConfirmPage = pathname.includes("confirm");
  const isBom = pathname.includes("bom");
  const issubRegis = pathname.includes("subRegis");
  const isDBSystem = pathname.includes("db-system");
  const isUffia = pathname.includes("uffia");

  const isAdmin = isBom || isDBSystem;
  const Menu = isAdmin ? AdminMenu : LeftMenu;

  if (isUffia) {
    return (
      <UffiaLayout>
        <ToastContainer
          position="top-right" // 알람 위치 지정
          autoClose={3000} // 자동 off 시간
          hideProgressBar={false} // 진행시간바 숨김
          closeOnClick // 클릭으로 알람 닫기
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Outlet />
      </UffiaLayout>
    );
  }

  return (
    <DefaultLayoutWrap>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header isAdmin={isAdmin} />
      <Menu>
        <Content ref={targetRef}>
          <ContentHeaderContainer>
            <ContentHeader />
            {isRegisPage && (
              <Button
                text={"영업사원과 문의하기"}
                style={{
                  background: "linear-gradient(90deg, #1e3271, #0990ba)",
                }}
                onClick={() => {
                  window.location.href =
                    "http://www.banseok.co.kr/kor/support/counsel.html";
                }}
              />
            )}
            {(isConfirmPage || issubRegis || isBom) && (
              <Button
                text={"해당 페이지 PDF 저장하기"}
                onClick={() => {
                  generatePDF(targetRef, { filename: "page.pdf" });
                }}
                style={{
                  backgroundColor: "#4a4a4a",
                }}
              />
            )}
          </ContentHeaderContainer>
          <ContentWrap>
            <ContentInner>
              <Outlet />
            </ContentInner>
          </ContentWrap>
        </Content>
      </Menu>
    </DefaultLayoutWrap>
  );
};

export default DefaultLayout;

const DefaultLayoutWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
`;

const ContentWrap = styled.div`
  display: flex;
  flex: 1;
  padding: 0 3rem;
`;

const ContentInner = styled.div`
  flex: 1;
  border-radius: 1rem 1rem 0 0;
  border: 1px solid #dcdcdc;
  height: 100%;
  overflow-y: scroll;

  & > div {
    height: 100%;
  }
`;
