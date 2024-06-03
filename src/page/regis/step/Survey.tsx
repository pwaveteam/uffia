import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { headerAtom } from "../../../store/atom/header";
import SurveyAction from "../../../store/action/survey";
import { useEffect, useState } from "react";
import Styles from "./Styles";
import Button from "../../../module/button";
import { AnswerAtom } from "../../../store/atom/survey";
import RadioSelect from "./component/RadioSelect";
import MultipleSelect from "./component/MultipleSelect";
import styled from "styled-components";
import Input from "../../../module/Input";
import Tooltip from "../../../module/Tooltip";
import Icon from "../../../module/Icon";

const Survey = ({ question, setQuestion }: any) => {
  const { seq } = useParams();
  const navigate = useNavigate();

  const [header, setHeader] = useRecoilState(headerAtom);
  const [answer, setAnswer] = useRecoilState<any>(AnswerAtom);
  console.log(answer)

  const { getSurvey } = SurveyAction();

  const handleUpdateValue = (e: any) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    try {
      const step = Number(seq);
      if (!step && step < 0) throw new Error("");

      setHeader((prev) => {
        const nowStep =
          Number(prev.nowStep) + (step > Number(prev.nowStep) ? 1 : -1);
        if (step === 3 || step === 15) {
          return prev;
        } else {
          return {
            ...prev,
            title: "질문 사항",
            nowStep: nowStep,
            maxStep: question.size,
          };
        }
      });

      getSurvey(step).then((res) => {
        setQuestion &&
          setQuestion((prev: any) => ({
            ...prev,
            ...res,
          }));
      });
    } catch (e) {
      navigate("/");
    }
  }, [seq]);

  useEffect(() => {
    let temp = { ...answer };
    question.row.map((it: any, key: number) => {
      temp = {
        ...temp,
        [answer["1"] === "2가지" && it.duplicate
          ? `${it.id}-${1}`
          : it.id]: "",
      };
    });
    setAnswer(temp);
  }, [question]);

  const handleInputUpdate = (e: any, idx: number, len: number) => {
    if (len > 1) {
      let temp = { ...answer };
      let xyz = temp[e.target.name].split(",");
      if (xyz.length < 3) xyz = ["", "", ""];
      xyz[idx] = e.target.value;

      if (seq !== "15") {
        xyz = xyz.filter(Boolean);
      }
      temp[e.target.name] = xyz.join(",");

      setAnswer(temp);
    } else {
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value,
      });
    }
  };

  const renderTooltip = (it: any) => {
    let message = it.infomation;

    if (it.infomation_type === "image") {
      message = (
        <img
          width={200}
          src={process.env.REACT_APP_IMAGE_URL + it.infomation}
        />
      );
    }

    return (
      <>
        {it.infomation && (
          <Tooltip title={it.infomation_title} message={message}>
            &nbsp;&nbsp;
            <Icon icon="info" width={20} />
          </Tooltip>
        )}
      </>
    );
  };

  const duplicateArray = answer["1"] === "2가지" && question.row[0].duplicate ? [1,2] : [1]

  const render = (duplicateNumber: number) => {


    return <Styles.ContentWrap step={"1"}>
    {question.row.map((it: any, key: number) => {
      const objKey = duplicateNumber === 2
      ? `${it.id}-${1}`
      : it.id;

      return (
        <>
          <Styles.SurveyWrap key={objKey} className={"parent"}>
            {answer["1"] === "2가지" && it.duplicate ? (
              <HeaderInfo>[액상 {duplicateNumber}]</HeaderInfo>
            ) : (
              ""
            )}
            <Header>
              {it.no}. {it.title} {renderTooltip(it)}
            </Header>
            <Row>
              {it.descriptionImage && (
                <DescriptionImage
                  width={200}
                  src={
                    process.env.REACT_APP_IMAGE_URL + it.descriptionImage
                  }
                />
              )}
              <SurveyInner>
                {it.answer.map((it2: any, key2: number, arr2: any) => {
                  if (it2.placeholder) {
                    return (
                      <div key={key2}>
                        <InputWrapper>
                          {it2.title ? it2.title : ""} &nbsp;
                          <Input
                            type={it2.type || "text"}
                            max={it2.max}
                            min={it2.min}
                            step={it2.step}
                            placeholder={it2.placeholder}
                            name={objKey}
                            value={
                              answer[objKey]?.split(",").length > 1
                                ? answer[objKey].split(",")[key2]
                                : answer[objKey]
                            }
                            onChange={(e: any) =>
                              handleInputUpdate(e, key2, arr2.length)
                            }
                          />{" "}
                          {it2.unit}
                        </InputWrapper>
                        {it2.description && (
                          <Description>* {it2.description}</Description>
                        )}
                      </div>
                    );
                  } else {
                    if (it.multiple) {
                      return (
                        <div key={key2}>
                          <MultipleSelect
                            name={objKey}
                            value={answer[objKey]}
                            title={it2.title}
                            item={it2}
                            checked={answer[objKey]?.includes(it2.title)}
                            onChange={(e: any) => handleUpdateValue(e)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={key2}>
                          <RadioSelect
                            name={objKey}
                            value={it2.title}
                            title={it2.title}
                            item={it2}
                            checked={answer[objKey] === it2.title}
                            onChange={(e: any) => handleUpdateValue(e)}
                          />
                        </div>
                      );
                    }
                  }
                })}
              </SurveyInner>
            </Row>
          </Styles.SurveyWrap>
          {/* {answer["1"] === "2가지" && it.duplicate === 1 && (
            <Styles.SurveyWrap
              key={`survey-${key}-duplicate`}
              className={"parent"}
            >
              {answer["1"] === "2가지" && it.duplicate ? (
                <HeaderInfo>[액상 {it.duplicate + 1}]</HeaderInfo>
              ) : (
                ""
              )}
              <Header>
                {it.no}. {it.title} {renderTooltip(it)}
              </Header>
              <Row>
                {it.descriptionImage && (
                  <DescriptionImage
                    width={200}
                    src={
                      process.env.REACT_APP_IMAGE_URL + it.descriptionImage
                    }
                  />
                )}
                <SurveyInner>
                  {it.answer.map((it2: any, key2: number) => {
                    if (it2.placeholder) {
                      return (
                        <div key={key2}>
                          <InputWrapper>
                            {it2.title ? it2.title : ""} &nbsp;
                            <Input
                              type={it2.type || "text"}
                              max={it2.max}
                              min={it2.min}
                              step={it2.step}
                              placeholder={it2.placeholder}
                              name={objKey2}
                              value={answer[objKey2] || ""}
                              onChange={(e: any) => handleUpdateValue(e)}
                            />{" "}
                            {it2.unit}
                          </InputWrapper>
                          {it2.description && (
                            <Description>* {it2.description}</Description>
                          )}
                        </div>
                      );
                    } else {
                      if (it.multiple) {
                        return (
                          <div key={key2}>
                            <MultipleSelect
                              name={objKey2}
                              value={answer[objKey2]}
                              title={it2.title}
                              item={it2}
                              checked={answer[objKey2]?.includes(it2.title)}
                              onChange={(e: any) => handleUpdateValue(e)}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={key2}>
                            <RadioSelect
                              name={objKey2}
                              value={it2.title}
                              title={it2.title}
                              item={it2}
                              checked={answer[objKey2] === it2.title}
                              onChange={(e: any) => handleUpdateValue(e)}
                            />
                          </div>
                        );
                      }
                    }
                  })}
                </SurveyInner>
              </Row>
            </Styles.SurveyWrap>
          )} */}
        </>
      );
    })}
  </Styles.ContentWrap>
  }

  
  return <Wrapper>{
    duplicateArray.map((duplicateNumber) => {
      return render(duplicateNumber)
    })
}</Wrapper>
};

const Wrapper = styled.div`
  display:flex;
  flex-direction: row;
  gap: 10rem;
`

export default Survey;

const HeaderInfo = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #0600ff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1.2rem;
  font-weight: bold;
`;

const SurveyInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
`;

const Description = styled.div`
  margin-top: 0.75rem;
  color: #808080;
  font-size: 0.75rem;

  white-space: pre-wrap;
`;

const DescriptionImage = styled.img``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
