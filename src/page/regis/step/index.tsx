import Styles from "./Styles";
import Survey from "./Survey";
import {useRecoilState, useRecoilValue} from "recoil";
import {headerAtom} from "../../../store/atom/header";
import PersonalInformation from "./PersonalInformation";
import Button from "../../../module/button";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PersonalAtom, AnswerAtom} from "../../../store/atom/survey";

const initialQuestion = {
  size: 0,
  prev: 0,
  next: 0,
  row: []
}

const Index = () => {
  const {seq} = useParams()
  const navigate = useNavigate()

  const header = useRecoilValue(headerAtom)
  const [personal, setPersonal] = useRecoilState(PersonalAtom)
  const [question, setQuestion] = useState(initialQuestion)
  const [answer, setAnswer] = useRecoilState<any>(AnswerAtom)

  const handleBackChange = (num: number) => {
    navigate(-1)
  }

  const handleStepChange = (num: number) => {
    if (dataValidation()) {
      if (!num) {
        navigate('/subRegis')
        return
      }
      let nextPage = num ? num : 1
      if (num === 3 && answer['1'] === '1가지') nextPage += 2
      if (nextPage === 15 && (answer['14'] === 'MANUAL' || answer['14'] === '')) {
        nextPage += 1
      }
      console.log(answer)
      navigate(`/regis/${nextPage}`)
    }
  }

  const dataValidation = () => {
    const personalValid = () => {
      let flag = true
      Object.entries(personal).map(([key, value]) => {
        if (!value) {
          flag = false
        }
      })
      return flag
    }

    const questionValid = () => {
      let flag = true
      question.row.map((it: any, key: number) => {
        const objKey = answer['1'] === '2가지' && it.duplicate ? `${it.id}-${key + 1}` : it.id
        if (!it.default) {
          if (!answer[objKey]) flag = false
        } else {
          if (!answer[objKey]) setAnswer((prev: any) => ({
            ...prev,
            [objKey.toString()]: it.default
          }))
        }
      })
      return flag
    }

    if (!(personalValid() && questionValid())) window.alert('비어있는 필드가 존재합니다.')
    return personalValid() && questionValid()
  }

  return <>
    <Styles.Container>
      {
        header.nowStep === 0 ?
          <PersonalInformation setQuestion={setQuestion}/> :
          <Survey
            answer={answer}
            setAnswer={setAnswer}
            question={question}
            setQuestion={setQuestion}
            handleStepChange={handleStepChange}
          />
      }

      <Styles.ButtonWrap>
        {
          Number(seq) >= 1 &&
          <Button text={'이전으로'} onClick={() => handleBackChange(question.prev)}/>
        }
        <Button bgColor={'#452df8'} text={'다음으로'} onClick={() => handleStepChange(question.next)}/>
      </Styles.ButtonWrap>
    </Styles.Container>
  </>
}

export default Index
