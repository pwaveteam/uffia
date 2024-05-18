import {useNavigate, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {headerAtom} from "../../../store/atom/header";
import SurveyAction from "../../../store/action/survey";
import {useEffect, useState} from "react";
import Styles from "./Styles";
import Button from "../../../module/button";
import {AnswerAtom} from "../../../store/atom/survey";

const Survey = ({question, setQuestion}: any) => {
  const {seq} = useParams()
  const navigate = useNavigate()

  const [header, setHeader] = useRecoilState(headerAtom)
  const [answer, setAnswer] = useRecoilState<any>(AnswerAtom)

  const {getSurvey} = SurveyAction()


  const handleUpdateValue = (e: any) => {
    // console.log(e.target.name, e.target.value)
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value
    })
  }

  /**
   * header 변경 시
   */
  useEffect(() => {
    try {
      const step = Number(seq)
      if (!step && step < 0) throw new Error('')

      setHeader(prev => {
        const nowStep = Number(prev.nowStep) + (step > Number(prev.nowStep) ? 1 : -1)
        if (step === 3 || step === 15) {
          return prev
        } else {
          return {
            ...prev,
            title: '질문 사항',
            nowStep: nowStep,
            maxStep: question.size,
          }
        }

      })

      getSurvey(step).then(res => {
        setQuestion && setQuestion((prev: any) => ({
          ...prev,
          ...res,
        }))
      })

    } catch (e) {
      navigate('/')
    }
  }, [seq])

  useEffect(() => {
    let temp = {...answer}
    question.row.map((it: any, key: number) => {
      temp = {
        ...temp,
        [answer['1'] === '2가지' && it.duplicate ? `${it.id}-${key + 1}` : it.id]: ''
      }
    })
    setAnswer(temp)
  }, [question])

  const handleInputUpdate = (e: any, idx: number, len: number) => {
    if (len > 1) {
      let temp = {...answer}
      let xyz = temp[e.target.name].split(',')
      if(xyz.length < 3) xyz = ['','','']
      xyz[idx] = e.target.value
      temp[e.target.name] = xyz.join(',')
      setAnswer(temp)
    } else {
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value
      })
    }
  }

  return <>
    <Styles.ContentWrap>
      {
        question.row.map((it: any, key: number) => {
          const objKey = answer['1'] === '2가지' && it.duplicate ? `${it.id}-${key + 1}` : it.id
          const objKey2 = answer['1'] === '2가지' && it.duplicate ? `${it.id}-${key + 3}` : it.id

          return <>
            <Styles.SurveyWrap key={key}>
              {answer['1'] === '2가지' && it.duplicate ? <p>[{key % 2 + 1}액형]</p> : ''}
              {it.no} {it.title}
              <div>
                {
                  it.answer.map((it2: any, key2: number, arr2: any) => {
                    if (it2.placeholder) {
                      return <div key={key2}>
                        {it2.title ? it2.title : '' } &nbsp;
                        <input placeholder={it2.placeholder}
                               name={objKey}
                               value={
                                 answer[objKey]?.split(',').length > 1 ? answer[objKey].split(',')[key2] : answer[objKey]
                               }
                               onChange={(e: any) => handleInputUpdate(e, key2, arr2.length)}
                        /> {it2.unit}
                      </div>
                    } else {
                      // return <p key={key}>{it.title}</p>
                      return <label key={key2}>
                        <input
                          type={'radio'}
                          name={objKey}
                          value={it2.title}
                          checked={answer[objKey] === it2.title}
                          onChange={(e: any) => handleUpdateValue(e)}
                        />
                        {it2.title}
                      </label>
                    }
                  })
                }
              </div>
            </Styles.SurveyWrap>
            {
              answer['1'] === '2가지' && it.duplicate === 1 && (
                <Styles.SurveyWrap key={`survey-${key}-duplicate`}>
                  {answer['1'] === '2가지' && it.duplicate ? <p>[{(key + 1) % 2 + 1}액형]</p> : ''}
                  {it.no} {it.title}
                  <div>
                    {
                      it.answer.map((it2: any, key2: number) => {
                        if (it2.placeholder) {
                          return <div key={key2}>
                            <input placeholder={it2.placeholder}
                                   name={objKey2}
                                   value={answer[objKey2] || ''}
                                   onChange={(e: any) => handleUpdateValue(e)}
                            /> {it2.unit}
                          </div>
                        } else {
                          // return <p key={key}>{it.title}</p>
                          return <label key={key2}>
                            <input
                              type={'radio'}
                              name={objKey2}
                              value={it2.title}
                              checked={answer[objKey2] === it2.title}
                              onChange={(e: any) => handleUpdateValue(e)}
                            />
                            {it2.title}
                          </label>
                        }
                      })
                    }
                  </div>
                </Styles.SurveyWrap>
              )
            }
          </>
        })
      }
    </Styles.ContentWrap>
  </>
}

export default Survey
