import styled from "styled-components";
import Textarea from "../../../module/Textarea";
import SelectInput from "../../../module/SelectInput";
import Switch from "../../../module/Switch";
import { useState } from "react";
import Button from "../../../module/UffiaButton";

const DocumentTypeOptions = [
  { value: "사무용 가구", label: "사무용 가구" },
  { value: "공부용 가구", label: "공부용 가구" },
];

/*
  타켓 이해
  비주얼 요소 활용
  명확하고 간결한 문장
  신뢰성 참조
  경쟁 분석
  고객 중심의 가치 제안
*/
const KeywordShortcuts = [
  { value: "타켓 이해", label: "타켓 이해" },
  { value: "비주얼 요소 활용", label: "비주얼 요소 활용" },
  { value: "명확하고 간결한 문장", label: "명확하고 간결한 문장" },
  { value: "신뢰성 참조", label: "신뢰성 참조" },
  { value: "경쟁 분석", label: "경쟁 분석" },
  { value: "고객 중심의 가치 제안", label: "고객 중심의 가치 제안" },
];

const DocumentInfo = () => {
  const [checked, setChecked] = useState(false);

  const [documentType, setDocumentType] = useState(
    DocumentTypeOptions[0].value
  );

  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleClickkeyword = (keyword: string) => {
    if (keywords.includes(keyword)) {
      setKeywords(keywords.filter((item) => item !== keyword));
    } else {
      setKeywords([...keywords, keyword]);
    }
  };

  return (
    <DocumentInfoContainer>
      <InfoTitle>
        <span>
          제안서 종류 선택<RedDot>*</RedDot>
        </span>
      </InfoTitle>
      <SelectInput
        value={documentType}
        options={DocumentTypeOptions}
        onChange={(e: any) => {
          setDocumentType(e.target.value);
        }}
      />
      <InfoTitle>
        <span>
          개요<RedDot>*</RedDot>
        </span>
      </InfoTitle>
      <Textarea
        value={description}
        rows={4}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <InfoTitle>
        Keyword
        <Switch
          size="small"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </InfoTitle>
      <Textarea
        value={keyword}
        rows={4}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {
        <KeywordShortcutsContainer>
          {KeywordShortcuts.map((keyword) => (
            <KeywordShortcut
              key={keyword.value}
              checked={!keywords.includes(keyword.label)}
              onClick={() => {
                handleClickkeyword(keyword.label);
              }}
            >
              #{keyword.label}
            </KeywordShortcut>
          ))}
        </KeywordShortcutsContainer>
      }
      <ButtonWrapper>
        <Button
          size={"large"}
          variant="uffia"
          text="저장하기"
          style={{
            fontSize: "1rem",
            padding: "0.5rem 3.5rem",
          }}
        />
      </ButtonWrapper>
    </DocumentInfoContainer>
  );
};

export default DocumentInfo;
const DocumentInfoContainer = styled.div`
  width: 320px;
  height: fit-content;

  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  font-weight: bold;

  padding-bottom: 0.5rem;
`;

const KeywordShortcutsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  gap: 0.25rem;
`;

const KeywordShortcut = styled.div<{
  checked?: boolean;
}>`
  padding: 0.25rem 0.5rem;

  font-size: 1rem;
  border: 1px solid #636363;
  border-radius: 0.25rem;
  color: #636363;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  ${({ checked }) =>
    checked &&
    `
    opacity: 0.5;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 2.5rem;
  padding-bottom: 1.5rem;
`;

const RedDot = styled.span`
  color: red;
  font-weight: normal;
`;
