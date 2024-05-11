import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {headerAtom} from "../../../store/atom/header";
import Styles from "./Styles";
import Button from "../../../module/button";

const Index = () => {

  const {seq} = useParams()
  const navigate = useNavigate()

  const [header, setHeader] = useRecoilState(headerAtom)

  const [question, setQuestion] = useState({
    size: 12,
    row: []
  })
  const [answer, setAnswer] = useState([])

  const handleStepChange = (num: number) => {
    if(Number(seq) + num > question.size ) {

    }else{
      navigate(`/regis/${Number(seq) + num}`)
    }
  }

  /**
   * header 변경 시
   */
  useEffect(() => {
    try {
      const step = Number(seq)
      if (!step && step < 0) throw new Error('')

      setHeader(prev => ({
        ...prev,
        title: step === 0 ? '질문 사항' : '기본 정보',
        nowStep: step,
        maxStep: question.size
      }))

    } catch (e) {
      navigate('/')
    }
  }, [seq])

  return <Styles.Container>
    <Styles.ContentWrap>
      dafsdf
    </Styles.ContentWrap>

    <Styles.ButtonWrap>
      {
        Number(seq) >= 1 && <Button text={'이전으로'} onClick={() => handleStepChange(-1)}/>
      }
      <Button bgColor={'#452df8'} text={'다음으로'} onClick={() => handleStepChange(1)}/>
    </Styles.ButtonWrap>
  </Styles.Container>
}

export default Index
