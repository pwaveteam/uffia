import {useEffect, useState} from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
`
const Info = styled.pre`
  left: 0;
  top: 1rem;
  position: absolute;
  padding: .5rem 1rem .5rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  background-color: white;
  > a {
    position: absolute;
    right: -2rem;
    top: .5rem;
    font-size: .7rem;
    cursor: pointer;
  }
`

const VideoInfo = styled.div`
  position: absolute;
  z-index: 999999999;
  background-color: white;
  left: 0;
  max-width: 20rem;
  top: 1rem;
  padding: .5rem 1rem .5rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  > video {
    width: 100%;
    display: block;
  }
  > a {
    position: absolute;
    right: -2rem;
    top: .5rem;
    font-size: .7rem;
    cursor: pointer;
    background-color: white;
  }
`

const RadioSelect = (props: any) => {

  const [isShow, setIsShow] = useState(false)
  const [isInfo, setIsInfo] = useState(false)

  useEffect(() => {
    setIsInfo(!!props.item.infomation_type)
  }, [props.item.infomation_type])

  return (
    <Wrap onClick={() => isInfo && setIsShow(true)}>
      <label>
        <input
          type={'checkbox'}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
        {props.title}
      </label>
      {
        isShow && props.item.infomation_type === 'text' ? (
          <Info>
            <p><b>{props.item.infomation_title}</b></p>
            <br/>
            <a onClick={(e:any) => {
              e.stopPropagation(); // 이벤트 전파를 막음
              setIsShow(false)
            }}>닫기</a>
            {props.item.infomation}
          </Info>
        ) : (
          isShow && props.item.infomation_type === 'video' && (
            <VideoInfo>
              <video muted autoPlay>
                <source src={process.env.REACT_APP_IMAGE_URL + props.item.infomation} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <a onClick={(e:any) => {
                e.stopPropagation(); // 이벤트 전파를 막음
                setIsShow(false)
              }}>닫기</a>
            </VideoInfo>
          )
        )
      }
    </Wrap>
  )
}

export default RadioSelect;
