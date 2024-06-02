import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SurveyAction from "../../../store/action/survey";
import Styles from "../Styles";
import styled from "styled-components";
import AdminAction from "../../../store/action/adminAction";
import { toast } from "react-toastify";

const ConfirmSurvey = () => {
  const { seq } = useParams();
  const navigate = useNavigate();

  const { getBom } = SurveyAction();

  const [state, setState] = useState<any>({});

  useEffect(() => {
    getBom(seq?.toString() || "0").then((res) => {
      setState(res.payload);
    });
  }, [seq]);

  const { sendEmail } = AdminAction();

  return (
    <>
      <Styles.ConfirmWrap>
        <Styles.ConfirmPerson>
          <Title>기본정보</Title>
          <div>
            <PersonInfoTitle className={"title"}>
              이름 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {" "}
              {state.person?.lastName}{" "}
            </PersonInfo>
          </div>
          <div>
            <PersonInfoTitle className={"title"}>
              {" "}
              성 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {" "}
              {state.person?.firstName}{" "}
            </PersonInfo>
          </div>
          <div>
            <PersonInfoTitle className={"title"}>
              {" "}
              국가 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {" "}
              {state.person?.nation}{" "}
            </PersonInfo>
          </div>
          <div>
            <PersonInfoTitle className={"title"}>
              {" "}
              전화 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {state.person?.callingCode} {state.person?.call}{" "}
            </PersonInfo>
          </div>
          <div>
            <PersonInfoTitle className={"title"}>
              {" "}
              회사 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {" "}
              {state.person?.company}{" "}
            </PersonInfo>
          </div>
          <div>
            <PersonInfoTitle className={"title"}>
              {" "}
              이메일 <RedDot>*</RedDot>
            </PersonInfoTitle>
            <PersonInfo className={"content"}>
              {" "}
              {state.person?.email}{" "}
            </PersonInfo>
          </div>
        </Styles.ConfirmPerson>
        <Styles.ConfirmSurvey>
          <Title>질문 / 답변</Title>
          {state.answer &&
            Object.entries(state.answer).map(
              ([key, value]: any, idx: number) => {
                return (
                  <div key={idx}>
                    <SurveyInfoTitle>
                      {value.no}. {value.question}
                    </SurveyInfoTitle>
                    {value.answer.map((it: any, idx2: number) => {
                      if (value.answer[idx2]) {
                        return (
                          <div key={idx2}>
                            {idx2 === 0 || idx2 === 2 ? (
                              <SurveyInfoContent key={idx2} className={"red"}>
                                {it}
                              </SurveyInfoContent>
                            ) : (
                              <SurveyInfoContent
                                key={idx2}
                                className={"answer"}
                              >
                                {it}
                              </SurveyInfoContent>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              }
            )}
        </Styles.ConfirmSurvey>
        <Styles.ConfirmETC>
          <Wrapper>
            <Title>장비 설명</Title>
            <p className={"desc"}>{state?.equipMent}</p>
          </Wrapper>
          <Wrapper>
            <Title>추가 옵션 </Title>
            <p className={"desc"}>{state?.etc?.option}</p>
          </Wrapper>
          <Wrapper>
            <Title>고객 요청 사항</Title>
            <p className={"desc"}>{state?.etc?.description}</p>
          </Wrapper>

          <Wrapper>
            <Title>업로드 이미지</Title>
            <p className={"desc"}>{state?.fileInfo?.equipImage?.name}</p>
          </Wrapper>
          <Wrapper>
            <Title>업로드 파일</Title>
            <p className={"desc"}>{state?.fileInfo?.pdfFile?.name}</p>
          </Wrapper>
        </Styles.ConfirmETC>
      </Styles.ConfirmWrap>
      <ButtonContainer>
        <Styles.ButtonWrap>
          <button
            onClick={async () => {
              // 누구에게 보내는지,
              // await sendEmail(email, {
              //   text: "mockup data",
              // });

              toast("제출되었습니다");

              navigate("/bom/detail/" + seq);
            }}
          >
            결과보기
          </button>
        </Styles.ButtonWrap>
      </ButtonContainer>
    </>
  );
};

export default ConfirmSurvey;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const PersonInfoTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const PersonInfo = styled.div`
  padding-top: 0.5rem;
  font-size: 0.75rem;
  color: #777;
`;

const RedDot = styled.span`
  color: red;
  font-weight: normal;
`;

const SurveyInfoTitle = styled.div`
  font-size: 0.8rem;
`;

const SurveyInfoContent = styled.div`
  font-size: 0.75rem;
  color: #777;
`;

const Wrapper = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  height: 10rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
