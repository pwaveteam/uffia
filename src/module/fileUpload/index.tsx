import Style from "./Style";
import {useEffect, useState} from "react";
import {UploadAction} from "../../store/action/upload";
import {fileURLToPath} from "url";

const Index = (props: any) => {

  const [state, setState] = useState<any>({
    name: '',
    thumbnail: ''
  })
  const [file, setFile] = useState([{
    id: null,
    path: null,
  }])
  const {uploadImage} = UploadAction()

  const handleUploadImage = (file: any) => {
    file && uploadImage(file, props.fileType, setFile)
  }

  const isImage = (filePath: any) => {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(filePath.toLowerCase());
  }

  const handleFileUpload = (e: any, type: any) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setState({
          ...state,
          name: file.name,
          thumbnail: reader.result,
        })
        handleUploadImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setState({name: '', thumbnail: ''})
    props.onChange({file: null})
  }

  useEffect(() => {
    setState({
      ...state,
      thumbnail: props.thumbnail
    })
  }, [props.thumbnail])

  useEffect(() => {
    setState({
      ...state,
      name: props.fileName
    })
  }, [props.fileName])

  useEffect(() => {
    props.setFileInfo && props.setFileInfo(file[0], state, props.fileType)
  }, [file])

  return <Style.Wrap>
    <Style.FileName>
      {
        !state.name ? '파일 선택' : state.name
      }
      <Style.UploadButton>
        파일 업로드
        <input
          type={'file'}
          accept={props.accept ? props.accept : '*/*'}
          onChange={(e) => handleFileUpload(e, props.name)}
        />
      </Style.UploadButton>
    </Style.FileName>
    <Style.ImageBody>
      {
        file[0]?.path && <>
          <img src={process.env.REACT_APP_IMAGE_URL + (isImage(file[0].path) ? file[0].path : 'static/default_file.svg' )}/>
        </>
      }
    </Style.ImageBody>
  </Style.Wrap>
}

export default Index
