import Styles from "./Styles";
import Survey from "./Survey";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {headerAtom} from "../../../store/atom/header";
import PersonalInformation from "./PersonalInformation";
import Button from "../../../module/button";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PersonalAtom, AnswerAtom} from "../../../store/atom/survey";
import {alertAtom} from "../../../store/atom/alert";

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
  const [answer, setAnswer] = useRecoilState<any>(AnswerAtom)
  const setAlert = useSetRecoilState(alertAtom)

  const [question, setQuestion] = useState(initialQuestion)

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

    if (!(personalValid() && questionValid())){
      setAlert({
        isShow: true,
        content: '필수 정보를 선택해주세요.'
      })
      setTimeout(() => {
        handleAppendWrongText()
      }, 100)
    }
    return personalValid() && questionValid()
  }

  const handleAppendWrongText = () => {
    // 모든 input 및 select 요소를 선택
    const elements = document.querySelectorAll('input, select');

    // 기존 경고 문구 삭제
    const existingWarnings = document.querySelectorAll('.warning-message');
    existingWarnings.forEach(warning => warning.remove());

    // 라디오 그룹 확인용 집합
    const checkedRadioGroups = new Set();

    // 각 요소를 순회하며 value가 비어있는지 확인
    elements.forEach((element: any) => {
      if (element.type === 'radio') {
        if (checkedRadioGroups.has(element.name)) {
          return;
        }

        // 같은 이름을 가진 라디오 그룹 찾기
        const radioGroup = document.querySelectorAll(`input[name="${element.name}"]`);
        const isChecked = Array.from(radioGroup).some((radio: any) => radio.checked);

        // 같은 이름의 라디오 버튼 그룹 중 하나도 체크되지 않았다면
        if (!isChecked) {
          // 현재 요소의 부모 요소를 찾기
          let parentElement = element.parentElement;

          // 부모 요소 중 className이 'parent'인 요소를 찾기
          while (parentElement && !parentElement.classList.contains('parent')) {
            parentElement = parentElement.parentElement;
          }

          // 'parent' 클래스를 가진 부모 요소가 존재할 경우
          if (parentElement) {
            // 첫 번째 p 요소 찾기
            const firstPElement = parentElement.querySelector('p');

            // 경고 문구를 담을 span 요소 생성
            const warningMessage = document.createElement('span');
            warningMessage.textContent = "*필수 정보 입니다.";
            warningMessage.style.color = 'red';  // 경고 문구를 빨간색으로 설정
            warningMessage.style.fontSize = '.7rem';  // 경고 문구를 빨간색으로 설정
            warningMessage.style.paddingBottom = '.5rem';
            warningMessage.classList.add('warning-message');  // 경고 문구에 클래스 추가

            // 첫 번째 p 요소가 존재하면 그 다음에 경고 문구 추가
            if (firstPElement) {
              firstPElement.insertAdjacentElement('afterend', warningMessage);
            } else {
              // 첫 번째 p 요소가 없으면 부모 요소의 마지막에 추가
              parentElement.appendChild(warningMessage);
            }
          }

          // 해당 라디오 그룹 이름을 확인된 그룹으로 추가
          checkedRadioGroups.add(element.name);
        }
      } else if (!element.value.trim()) {
        // 현재 요소의 부모 요소를 찾기
        let parentElement = element.parentElement;

        // 부모 요소 중 className이 'parent'인 요소를 찾기
        while (parentElement && !parentElement.classList.contains('parent')) {
          parentElement = parentElement.parentElement;
        }

        // 'parent' 클래스를 가진 부모 요소가 존재할 경우
        if (parentElement) {
          // 첫 번째 p 요소 찾기
          const firstPElement = parentElement.querySelector('p');

          // 경고 문구를 담을 span 요소 생성
          const warningMessage = document.createElement('span');
          warningMessage.textContent = "*필수 정보 입니다.";
          warningMessage.style.color = 'red';  // 경고 문구를 빨간색으로 설정
          warningMessage.style.fontSize = '.7rem';  // 경고 문구를 빨간색으로 설정
          warningMessage.style.paddingBottom = '.5rem';
          warningMessage.classList.add('warning-message');  // 경고 문구에 클래스 추가

          // 첫 번째 p 요소가 존재하면 그 다음에 경고 문구 추가
          if (firstPElement) {
            firstPElement.insertAdjacentElement('afterend', warningMessage);
          } else {
            // 첫 번째 p 요소가 없으면 부모 요소의 마지막에 추가
            parentElement.appendChild(warningMessage);
          }
        }
      }
    });
  }


  useEffect(() => {
    // 경고 문구 삭제
    const existingWarnings = document.querySelectorAll('.warning-message');
    existingWarnings.forEach(warning => warning.remove());
  }, [seq])


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
