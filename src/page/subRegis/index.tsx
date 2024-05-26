import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {headerAtom} from "../../store/atom/header";
import {useEffect, useState} from "react";
import Styles from "./Styles";
import FileUpload from "../../module/fileUpload";
import {UploadAction} from "../../store/action/upload";
import {AnswerAtom, PersonalAtom} from "../../store/atom/survey";
import SurveyAction from "../../store/action/survey";
import {useNavigate} from "react-router-dom";

const Index = () => {

  const options = ['옵션 1', '옵션 2', '옵션 3', '옵션 4', '옵션 5']

  const [result, setResult] = useState<any>({})
  const [etc, setEtc] = useState({
    description: '',
    option: ''
  })
  const [fileInfo, setFileInfo] = useState({
    equipImage: 0,
    pdfFile: 0
  })

  const navigate = useNavigate()

  const setHeader = useSetRecoilState(headerAtom)
  const answer = useRecoilValue(AnswerAtom)
  const personal = useRecoilValue(PersonalAtom)

  const resetAnswer = useResetRecoilState(AnswerAtom)
  const resetPersonal = useResetRecoilState(PersonalAtom)

  const {postSurvey, saveSurvey} = SurveyAction()

  const handleFileInfo = (file: any, state:any,  typeKey: string) => {
    setFileInfo({
      ...fileInfo,
      [typeKey]: {
        id: file.id,
        name: state.name,
        path: file.path
      }
    })
  }

  const handleOptionCheck = (key:number, e: any) => {
    let temp = etc.option.length > 1 ? etc.option.split(',') : []

    if(e.target.checked){
      temp.push(options[key])
    }else{
      temp = temp.filter(it => it !== options[key])
    }

    setEtc({
      ...etc,
      option: temp.toString()
    })
  }

  const mergeItems = (items: any) => {
    const merged: any = {};

    items.forEach((item:any) => {
      if (item === null) return;
      if (!merged[item.id]) {
        merged[item.id] = { ...item };
      } else {
        merged[item.id] = {
          ...merged[item.id],
          single_amount: merged[item.id].single_amount + item.single_amount
        };
      }
    });

    return {
      item : Object.values(merged),
      cnt: 1
    };
  };

  const handleSubmit = () => {
    const body = {
      fileInfo: JSON.stringify(fileInfo),
      personal: JSON.stringify(personal),
      survey: JSON.stringify({
        ...result.payload,
        application: mergeItems(result.payload.application),
        discharge: mergeItems(result.payload.discharge),
        supply: mergeItems(result.payload.supply),
        robot: mergeItems(result.payload.robot),
      }),
      etc: JSON.stringify(etc),
      duplicate: answer['1'] === '2가지',
      answer: JSON.stringify(answer)
    }

    saveSurvey(body).then(res => {
      resetAnswer()
      resetPersonal()

      navigate(`/confirm/${res.payload.seq}`)
    })
  }

  useEffect(() => {
    postSurvey(answer)
      .then((res: any) => {
        setResult(res)
      })

    setHeader({
      title: '최종 페이지',
      maxStep: 0,
      nowStep: 0
    })
  }, [])

  return <Styles.SubWrap>
    <Styles.ContentBody>
      <Styles.Title> 3D 사진 </Styles.Title>
      <Styles.Content>
        <p> 3D 캐드 적용</p>
      </Styles.Content>
    </Styles.ContentBody>

    <Styles.ContentBody>
      <Styles.Title> 장비 설명 </Styles.Title>
      <Styles.Content>
        <p> {result.payload?.equipMent} </p>
      </Styles.Content>
    </Styles.ContentBody>

    <Styles.ContentBody>
      <Styles.Title> 옵션 </Styles.Title>
      <Styles.Content>
        {
          options.map((item, key) => (
            <>
              <label key={key}>
                <input
                  type={"checkbox"}
                  name={'optionCheck'}
                  value={item}
                  checked={etc.option.indexOf(item) !== -1}
                  onChange={e => handleOptionCheck(key, e)}
                />
                {item}
              </label>
              <br/>
            </>
          ))
        }

      </Styles.Content>
    </Styles.ContentBody>

    <Styles.ContentBody>
      <Styles.Title> 추가로 원하는 점이나 필요한 기능이 있다면 최대한 자세히 적어주세요. </Styles.Title>
      <Styles.Content>
        <Styles.TextArea value={etc.description} onChange={e => setEtc(prevState => ({
          ...prevState,
          description: e.target.value
        }))}/>
      </Styles.Content>
    </Styles.ContentBody>

    <Styles.ContentBody>
      <Styles.Title> 장비를 적용하려는 제품의 사진 (jpeg, PNG) </Styles.Title>
      <Styles.Content>
        <FileUpload fileType={'equipImage'} setFileInfo={handleFileInfo}/>
      </Styles.Content>
    </Styles.ContentBody>

    <Styles.ContentBody>
      <Styles.Title> 액상 TDS(PDF) </Styles.Title>
      <Styles.Content>
        <FileUpload
          fileType={'pdfFile'}
          setFileInfo={handleFileInfo}
          accept={'application/pdf'}
        />
      </Styles.Content>
    </Styles.ContentBody>
    <button onClick={handleSubmit}>제출하기</button>
  </Styles.SubWrap>
}

export default Index
