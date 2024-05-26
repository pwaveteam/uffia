import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { headerAtom } from "../../../store/atom/header";
import SurveyAction from "../../../store/action/survey";
import { useEffect, useState } from "react";
import Styles from "./Styles";
import Button from "../../../module/button";
import { AnswerAtom } from "../../../store/atom/survey";
import RadioSelect from "./component/RadioSelect";
import InfoPopup from "./component/InfoPopup"; // InfoPopup 컴포넌트를 임포트합니다.

const Survey = ({ question, setQuestion }: any) => {
  const { seq } = useParams();
  const navigate = useNavigate();

  const [header, setHeader] = useRecoilState(headerAtom);
  const [answer, setAnswer] = useRecoilState<any>(AnswerAtom);
  const [popupInfo, setPopupInfo] = useState<any[]>([]); // 팝업 정보를 배열로 저장할 상태를 추가합니다.

  const { getSurvey } = SurveyAction();

  const handleUpdateValue = (e: any) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    try {
      const step = Number(seq);
      if (!step && step < 0) throw new Error("");

      setHeader(prev => {
        const nowStep = Number(prev.nowStep) + (step > Number(prev.nowStep) ? 1 : -1);
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

      getSurvey(step).then(res => {
        setQuestion && setQuestion((prev: any) => ({
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
        [answer["1"] === "2가지" && it.duplicate ? `${it.id}-${key + 1}` : it.id]: ""
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
      temp[e.target.name] = xyz.join(",");
      setAnswer(temp);
    } else {
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleOpenPopup = (info: any) => {
    setPopupInfo(prev => [...prev, info]);
  };

  const handleClosePopup = (info: any) => {
    setPopupInfo(prev => prev.filter(popup => popup !== info));
  };

  return (
    <>
      <Styles.ContentWrap>
        {question.row.map((it: any, key: number) => {
          const objKey = answer["1"] === "2가지" && it.duplicate ? `${it.id}-${key + 1}` : it.id;
          const objKey2 = answer["1"] === "2가지" && it.duplicate ? `${it.id}-${key + 3}` : it.id;

          return (
            <>
              <Styles.SurveyWrap key={key} className={"parent"}>
                {answer["1"] === "2가지" && it.duplicate ? <p>[{key % 2 + 1}액형]</p> : ""}
                <p  onClick={() => it.infomation_type && handleOpenPopup(it)}>{it.no}. {it.title}</p>
                <div>
                  {it.answer.map((it2: any, key2: number, arr2: any) => {
                    if (it2.placeholder) {
                      return (
                        <div key={key2}>
                          {it2.title ? it2.title : ""} &nbsp;
                          <input
                            placeholder={it2.placeholder}
                            name={objKey}
                            value={answer[objKey]?.split(",").length > 1 ? answer[objKey].split(",")[key2] : answer[objKey]}
                            onChange={(e: any) => handleInputUpdate(e, key2, arr2.length)}
                          /> {it2.unit}
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
                  })}
                </div>
              </Styles.SurveyWrap>
              {answer["1"] === "2가지" && it.duplicate === 1 && (
                <Styles.SurveyWrap key={`survey-${key}-duplicate`} className={"parent"}>
                  {answer["1"] === "2가지" && it.duplicate ? <p>[{(key + 1) % 2 + 1}액형]</p> : ""}
                  <p  onClick={() => it.infomation_type && handleOpenPopup(it)}>{it.no}. {it.title}</p>
                  <div>
                    {it.answer.map((it2: any, key2: number) => {
                      if (it2.placeholder) {
                        return (
                          <div key={key2}>
                            <input
                              placeholder={it2.placeholder}
                              name={objKey2}
                              value={answer[objKey2] || ""}
                              onChange={(e: any) => handleUpdateValue(e)}
                            /> {it2.unit}
                          </div>
                        );
                      } else {
                        return (
                          <div key={key2}>
                            <RadioSelect
                              name={objKey2}
                              value={it2.title}
                              title={it2.title}
                              checked={answer[objKey2] === it2.title}
                              item={it2}
                              onChange={(e: any) => handleUpdateValue(e)}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </Styles.SurveyWrap>
              )}
            </>
          );
        })}
      </Styles.ContentWrap>
      {popupInfo.map((popup, index) => (
        <InfoPopup
          key={index}
          type={popup.infomation_type}
          content={popup.infomation}
          title={popup.infomation_title}
          onClose={() => handleClosePopup(popup)}
        />
      ))}
    </>
  );
};

export default Survey;
