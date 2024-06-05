import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SurveyAction from "../../../store/action/survey";
import Styles from "../Styles";
import styled from "styled-components";
import AdminAction from "../../../store/action/adminAction";
import { toast } from "react-toastify";
import Button from "../../../module/button";

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

  const emailRef = useRef(null);

  return (
    <>
      <Styles.ConfirmWrap ref={emailRef}>
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
            Object.entries(state.answer)
              .sort((a, b) => {
                const A: any = a;
                const B: any = b;
                const [firstA, secondA] = A[1]?.no.split("-").map(Number);
                const [firstB, secondB] = B[1]?.no.split("-").map(Number);

                if (firstA > firstB) {
                  return 1;
                } else if (firstA < firstB) {
                  return -1;
                }

                if (secondA > secondB) {
                  return 1;
                } else if (secondA < secondB) {
                  return -1;
                }

                return 1;
              })
              .map(([key, value]: any, idx: number) => {
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
                                {it.split("@").filter(Boolean).join(",")}
                              </SurveyInfoContent>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
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
        <ButtonWrap>
          <Button
            width={"200px"}
            bgColor={"#99210e"}
            onClick={async () => {
              const dom: any = emailRef.current;
              const html = dom.outerHTML;

              await sendEmail("Banseokdispenser@gmail.com", "자동 견적서", {
                url: `http://localhost:3000/bom/detail/${seq}`,
                html,
              });
              await sendEmail("wevyeun@gmail.com", "자동 견적서", {
                url: `http://localhost:3000/bom/detail/${seq}`,
                html,
              });

              toast("제출되었습니다");

              navigate("/bom/detail/" + seq);
            }}
            text={"제출하기"}
          />
        </ButtonWrap>
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

export const RedDot = styled.span`
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

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  padding-right: 2rem;
`;
