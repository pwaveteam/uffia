import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ContentHeader from "./ContentHeader";
import DescriptionList from "./DescriptionList";

const MockDescriptionData = [
  {
    title: "가구 카테고리",
    totalRows: 2,
    options: [
      ["모션데스크", "mobjet series"],
      ["콤비장", "수납장", "1단", "2단", "3단"],
    ],
  },
  {
    title: "규격 변경",
    totalRows: 1,
    options: [["옵션1", "옵션2", "옵션3", "옵션4", "옵션5"]],
  },
  {
    title: "색상 변경",
    totalRows: 1,
    options: [["옵션1", "옵션2", "옵션3", "옵션4", "옵션5"]],
  },
  {
    title: "디자인 변경",
    totalRows: 1,
    options: [["옵션1", "옵션2", "옵션3", "옵션4", "옵션5"]],
  },
  {
    title: "사진구도 변경",
    totalRows: 1,
    options: [["옵션1", "옵션2", "옵션3", "옵션4", "옵션5"]],
  },
];

const AiContent = () => {
  const [documentName, setDocumentName] = useState("프로젝트1");

  const saveData = () => {
    toast("저장되었습니다.");
  };

  return (
    <Container>
      <ContentHeader
        documentName={documentName}
        onChangeDocumentName={(name: string) => {
          setDocumentName(name);
        }}
      />
      <Wrapper>
        <DescriptionContainer>
          <DescriptionWrapper>
            <DescriptionList data={MockDescriptionData} />
          </DescriptionWrapper>
        </DescriptionContainer>
      </Wrapper>
    </Container>
  );
};

export default AiContent;

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  padding-top: 3rem;
  width: 1200px;

  height: 500px;
  border: 1px solid #e0e0e0;
`;

const DescriptionWrapper = styled.div``;

const Wrapper = styled.div`
  margin: 0 auto;
`;
