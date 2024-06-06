import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ContentHeader from "./ContentHeader";
import DescriptionList from "./DescriptionList";
import Button from "../../../module/UffiaButton";
import Icon from "../../../module/Icon";

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
  const [documentName, setDocumentName] = useState("컨텐츠 1");

  const [image, setImage] = useState("/icon/plus.png");

  const [selectedOptions, setSelectedOptions] = useState<any>({
    "가구 카테고리_0": "모션데스크",
    "가구 카테고리_1": "수납장",
    "규격 변경": "옵션1",
    "색상 변경": "옵션3",
    "디자인 변경": "옵션3",
    "사진구도 변경": "옵션5",
  });

  const saveData = () => {
    toast("복사되었습니다.");
  };

  const saveImage = () => {
    toast("저장되었습니다.");

    const link = document.createElement("a");
    link.setAttribute("download", "image.png");
    link.href = process.env.PUBLIC_URL + "/createdImage/image.png";
    link.click();
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
          <DescriptionList
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            data={MockDescriptionData}
          />
        </DescriptionContainer>
        <ImageContainer>
          <ButtonContainer>
            <Button
              outline
              variant="secondary"
              text="이미지 복사하기"
              onClick={saveData}
              style={{
                padding: "0.5rem 3.5rem",
              }}
            />
            <Button
              outline
              text="이미지 저장하기"
              onClick={saveImage}
              style={{
                padding: "0.5rem 3.5rem",
              }}
            />
          </ButtonContainer>
          <ImageViewerContainer>
            <SelectedOptionsViewer>
              {Object.keys(selectedOptions).map((key) => (
                <SelectedOption key={key}>
                  <span> {selectedOptions[key]}</span>
                  <Icon
                    icon="close"
                    width={8}
                    height={8}
                    onClick={() => {
                      setSelectedOptions((prev: any) => {
                        const newSelectedOptions = { ...prev };
                        delete newSelectedOptions[key];
                        return newSelectedOptions;
                      });
                    }}
                  />
                </SelectedOption>
              ))}
            </SelectedOptionsViewer>
            <ImageViewer>
              <img src="/createdImage/image.png" alt="image" />
            </ImageViewer>
          </ImageViewerContainer>
        </ImageContainer>
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
`;

const Wrapper = styled.div`
  padding-left: 11rem;
  padding-right: 11rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  padding-top: 3rem;
  padding-bottom: 1rem;
`;

const ImageViewerContainer = styled.div`
  border: 1px solid #e0e0e0;
`;

const SelectedOptionsViewer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid black;

  background-color: #f0f6ff;
  height: 4rem;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const ImageViewer = styled.div`
  padding: 1rem;

  border-radius: 0.5rem;

  display: flex;
  justify-content: center;

  img {
    width: 60%;
    object-fit: cover;
  }
`;
