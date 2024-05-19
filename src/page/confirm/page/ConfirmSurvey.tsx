import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SurveyAction from "../../../store/action/survey";
import Styles from "../Styles";

const ConfirmSurvey = () => {

  const {seq} = useParams()

  const {getBom} = SurveyAction()
  const [state, setState] = useState<any>({})

  useEffect(() => {
    getBom(seq?.toString() || '0').then(res => {
      setState(res.payload)
      console.log(res.payload)
    })
  }, [seq])

  return <Styles.ConfirmWrap>
    <Styles.ConfirmPerson>

      <div>
        <p className={'title'}> 이름 </p>
        <p className={'content'}> {state.person?.lastName} </p>
      </div>
      <div>
        <p className={'title'}> 성 </p>
        <p className={'content'}> {state.person?.firstName} </p>
      </div>
      <div>
        <p className={'title'}> 국가 </p>
        <p className={'content'}> {state.person?.nation} </p>
      </div>
      <div>
        <p className={'title'}> 전화 </p>
        <p className={'content'}> {state.person?.callingCode} {state.person?.call} </p>
      </div>
      <div>
        <p className={'title'}> 회사 </p>
        <p className={'content'}> {state.person?.company} </p>
      </div>
      <div>
        <p className={'title'}> 이메일 </p>
        <p className={'content'}> {state.person?.email} </p>
      </div>

    </Styles.ConfirmPerson>
    <Styles.ConfirmSurvey>
      {
        state.answer && Object.entries(state.answer).map( ([key, value]: any, idx: number) => {
          return <div key={idx}>
            <p>{value.no}. {value.question}</p>
              {
                value.answer.map( (it:any, idx2:number) => {
                  if(value.answer[idx2]) {
                    return <div key={idx2}>
                      {
                        idx2 === 0 || idx2 === 2 ?
                          <p key={idx2} className={'red'}> {it} </p> :
                          <p key={idx2} className={'answer'}>{it}</p>
                      }
                    </div>
                  }
                })
              }
          </div>
        })
      }
    </Styles.ConfirmSurvey>
    <Styles.ConfirmETC>
      <div>
        <p className={'title'}>장비 설명</p>
        <p className={'desc'}>{state?.equipMent}</p>
      </div>
      <div>
        <p className={'title'}>추가 옵션 </p>
        <p className={'desc'}>{state?.etc?.option}</p>
      </div>
      <div>
        <p className={'title'}>고객 요청 사항</p>
        <p className={'desc'}>{state?.etc?.description}</p>
      </div>
      <hr/>

      <div>
        <p className={'title'}>업로드 이미지</p>
        <p className={'desc'}>{state?.fileInfo?.equipImage?.name}</p>
      </div>
      <div>
        <p className={'title'}>업로드 파일</p>
        <p className={'desc'}>{state?.fileInfo?.pdfFile?.name}</p>
      </div>
    </Styles.ConfirmETC>
  </Styles.ConfirmWrap>
}

export default ConfirmSurvey
