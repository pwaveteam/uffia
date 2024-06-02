import { useEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { headerAtom } from "../../../store/atom/header";
import SurveyAction from "../../../store/action/survey";
import { useParams } from "react-router-dom";
import Styles from "./Styles";
import { NationList } from "./data/nation";
import { CallingCodeList } from "./data/CallingCodeList";
import { AnswerAtom, PersonalAtom } from "../../../store/atom/survey";
import RequireField from "../../../module/RequireField";
import styled from "styled-components";

const PersonalInformation = ({ setQuestion }: any) => {
  const { seq } = useParams();

  const setHeader = useSetRecoilState(headerAtom);
  const [personal, setPersonal] = useRecoilState(PersonalAtom);
  const resetAnswer = useResetRecoilState(AnswerAtom);

  const { getSurveySize } = SurveyAction();

  useEffect(() => {
    setHeader({
      title: "기본 정보",
      maxStep: 0,
      nowStep: 0,
    });

    resetAnswer();

    getSurveySize().then((res: { max_value: number }) => {
      setQuestion &&
        setQuestion((prev: any) => ({
          size: res.max_value,
          prev: 0,
          next: 1,
          row: [],
        }));
    });
  }, []);

  useEffect(() => {
    if (seq !== "0")
      setHeader((prev: any) => ({
        ...prev,
        nowStep: 1,
      }));
  }, [seq]);

  return (
    <ContentWrap>
      <RequireField
        title={"이름 Name"}
        require={true}
        type={"text"}
        value={personal.lastName}
        placeholder={"이름"}
        onChange={(e: any) =>
          setPersonal((prev: any) => ({ ...prev, lastName: e }))
        }
      />
      <RequireField
        title={"성 Last Name"}
        require={true}
        type={"text"}
        value={personal.firstName}
        placeholder={"성"}
        onChange={(e: any) =>
          setPersonal((prev: any) => ({ ...prev, firstName: e }))
        }
      />
      <RequireField
        title={"회사 Company"}
        require={true}
        type={"text"}
        value={personal.company}
        placeholder={"회사"}
        onChange={(e: any) =>
          setPersonal((prev: any) => ({ ...prev, company: e }))
        }
      />

      <Styles.PersonalInputWrap require={"1"} className={"parent"}>
        <p>국가 Country</p>
        <select
          value={personal.nation}
          onChange={(e) =>
            setPersonal((prev: any) => ({ ...prev, nation: e.target.value }))
          }
        >
          <option value={""} disabled hidden>
            국가 선택
          </option>
          {NationList.map((it: string, key: number) => (
            <option key={key}>{it}</option>
          ))}
        </select>
      </Styles.PersonalInputWrap>

      <RequireField
        title={"이메일 E-mail address"}
        require={true}
        type={"text"}
        value={personal.email}
        placeholder={"1234@mail.com"}
        onChange={(e: any) =>
          setPersonal((prev: any) => ({ ...prev, email: e }))
        }
      />

      <Styles.PersonalInputWrap require={"1"} className={"parent"}>
        <p>전화번호 Telephone</p>
        <div>
          <select
            value={personal.callingCode}
            onChange={(e) =>
              setPersonal((prev: any) => ({
                ...prev,
                callingCode: e.target.value,
              }))
            }
          >
            {CallingCodeList.map((it: string, key: number) => (
              <option key={key}>{it}</option>
            ))}
          </select>
          <input
            type={"text"}
            value={personal.call}
            placeholder={"000-0000-0000"}
            onChange={(e) =>
              setPersonal((prev: any) => ({ ...prev, call: e.target.value }))
            }
          />
        </div>
      </Styles.PersonalInputWrap>
    </ContentWrap>
  );
};

export default PersonalInformation;

const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
