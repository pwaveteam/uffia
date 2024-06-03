import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { headerAtom } from "../../store/atom/header";
import { useEffect, useState } from "react";
import Styles from "./Styles";
import FileUpload from "../../module/fileUpload";
import { UploadAction } from "../../store/action/upload";
import { AnswerAtom, PersonalAtom } from "../../store/atom/survey";
import SurveyAction from "../../store/action/survey";
import { useNavigate } from "react-router-dom";
import Button from "../../module/button";
import styled from "styled-components";

const Index = () => {
  const options = ["housing ( case )", "In-Line System( 장비 자동화 )", "Machine Vision", "Touch Screen"];

  const [result, setResult] = useState<any>({});
  const [etc, setEtc] = useState({
    description: "",
    option: "",
  });
  const [fileInfo, setFileInfo] = useState({
    equipImage: 0,
    pdfFile: 0,
  });

  const navigate = useNavigate();

  const setHeader = useSetRecoilState(headerAtom);
  const answer = useRecoilValue(AnswerAtom);
  const personal = useRecoilValue(PersonalAtom);

  const resetAnswer = useResetRecoilState(AnswerAtom);
  const resetPersonal = useResetRecoilState(PersonalAtom);

  const { postSurvey, saveSurvey } = SurveyAction();

  const handleFileInfo = (file: any, state: any, typeKey: string) => {
    setFileInfo({
      ...fileInfo,
      [typeKey]: {
        id: file.id,
        name: state.name,
        path: file.path,
      },
    });
  };

  const handleOptionCheck = (key: number, e: any) => {
    let temp = etc.option.length > 1 ? etc.option.split(",") : [];

    if (e.target.checked) {
      temp.push(options[key]);
    } else {
      temp = temp.filter((it) => it !== options[key]);
    }

    setEtc({
      ...etc,
      option: temp.toString(),
    });
  };

  const mergeItems = (items: any) => {
    const merged: any = {};

    items.forEach((item: any) => {
      if (item === null) return;
      if (!merged[item.id]) {
        merged[item.id] = { ...item };
      } else {
        merged[item.id] = {
          ...merged[item.id],
          single_amount: merged[item.id].single_amount + item.single_amount,
        };
      }
    });

    return {
      item: Object.values(merged),
      cnt: 1,
    };
  };

  const handleSubmit = () => {

    const payload = result.payload || {
      application: [],
      discharge: [],
      supply: [],
      robot: [],
    }

    const body = {
      fileInfo: JSON.stringify(fileInfo),
      personal: JSON.stringify(personal),
      survey: JSON.stringify({
        ...payload,
        application: mergeItems(payload.application),
        discharge: mergeItems(payload.discharge),
        supply: mergeItems(payload.supply),
        robot: mergeItems(payload.robot),
      }),
      etc: JSON.stringify(etc),
      duplicate: answer["1"] === "2가지",
      answer: JSON.stringify(answer),
    };

    saveSurvey(body).then((res) => {
      resetAnswer();
      resetPersonal();

      navigate(`/confirm/${res.payload.seq}`);
    });
  };

  useEffect(() => {
    postSurvey(answer).then((res: any) => {
      setResult(res);
    });

    setHeader({
      title: "최종 페이지",
      maxStep: 0,
      nowStep: 0,
    });
  }, []);

  return (
    <Styles.SubWrap>
      <ColumnContainer>
        <Content>
          <Styles.Title> 3D 사진 </Styles.Title>
          <img width={"70%"} src={process.env.REACT_APP_IMAGE_URL + 'static/dual-cartridge.png'}/>
        </Content>

        <Content>
          <Styles.Title> 장비 설명 </Styles.Title>
          <p> {result.payload?.equipMent} </p>
        </Content>

        <Content>
          <Styles.Title>
            {
              "추가로 원하는 점이나 필요한 기능이 있다면 최대한 자세히 적어주세요."
            }
          </Styles.Title>
          <Styles.TextArea
            value={etc.description}
            onChange={(e) =>
              setEtc((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </Content>
      </ColumnContainer>
      <ColumnContainer>
        <Content isGray>
          <Styles.Title> 옵션 </Styles.Title>
          {options.map((item, key) => (
            <>
              <label key={key}>
                <input
                  type={"checkbox"}
                  name={"optionCheck"}
                  value={item}
                  checked={etc.option.indexOf(item) !== -1}
                  onChange={(e) => handleOptionCheck(key, e)}
                />
                {item}
              </label>
              <br />
            </>
          ))}
        </Content>

        <Content isGray>
          <Styles.Title>
            {"장비를 적용하려는 제품의 사진 (jpeg, PNG)"}
          </Styles.Title>
          <FileUpload fileType={"equipImage"} setFileInfo={handleFileInfo} />
        </Content>

        <Content isGray>
          <Styles.Title> 액상 TDS(PDF) </Styles.Title>
          <FileUpload
            fileType={"pdfFile"}
            setFileInfo={handleFileInfo}
            accept={"application/pdf"}
          />
        </Content>

        <Styles.ButtonWrap>
          <Button
            width={"100%"}
            bgColor={"#452df8"}
            onClick={handleSubmit}
            text={"결과보기"}
          />
        </Styles.ButtonWrap>
      </ColumnContainer>
    </Styles.SubWrap>
  );
};

export default Index;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;

  width: 40%;
`;

const Content = styled.div<{
  isGray?: boolean;
}>`
  max-height: 13rem;
  min-height: 13rem;

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;

  ${(props) =>
    props.isGray &&
    `
    background-color: #f8f8f8;
  `}

  overflow: scroll;
`;
