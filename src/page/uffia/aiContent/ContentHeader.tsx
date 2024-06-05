import { useState } from "react";
import Switch from "../../../module/Switch";
import styled from "styled-components";

const ContentHeader = () => {
  const [checked, setChecked] = useState(false);
  const [documentName, setDocumentName] = useState("프로젝트1");
  return (
    <Header>
      <Title>AI 컨텐츠 관리</Title>
      <AiToggleWrapper>
        <SwitchLabel checked={!checked}> 끔</SwitchLabel>
        <Switch checked={checked} onChange={() => setChecked(!checked)} />
        <SwitchLabel checked={checked}>AI 사용</SwitchLabel>
      </AiToggleWrapper>
      <DocumentContainer>
        <DocumentWrapper>
          <DocumentTitle>문서명</DocumentTitle>
          <UnderLineInput
            value={documentName}
            onChange={(e) => {
              setDocumentName(e.target.value);
            }}
          />
        </DocumentWrapper>
      </DocumentContainer>
    </Header>
  );
};

export default ContentHeader;

const Header = styled.div`
  height: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;

  margin: 0.5rem 1.25rem 0 1.25rem;
  padding: 1.25rem 0 0.75rem 0;
`;

const Title = styled.div`
  width: 130px;
  color: black;
  font-size: 1.25rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const AiToggleWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SwitchLabel = styled.span<{
  checked?: boolean;
}>`
  color: ${(props) => (props.checked ? "#636363" : "#8e8e8e")};
  font-size: 0.75rem;
  font-weight: bold;
`;

const DocumentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const DocumentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem;
`;

const DocumentTitle = styled.div`
  font-size: 1rem;
  color: #636363;
`;

const UnderLineInput = styled.input`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  color: #8e8e8e;
  font-size: 0.8rem;

  padding: 0.25rem;
  outline: none;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid #3e7aff;
  }
`;
