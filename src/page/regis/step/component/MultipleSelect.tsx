import {useEffect, useState} from "react";
import styled from "styled-components";
import Tooltip from "../../../../module/Tooltip";
import Icon from "../../../../module/Icon";
import { convertToTitleCase } from "./RadioSelect";

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
  const renderMessage = () => {
    if (props.item.infomation_type === "text") {
      return (
        <Info>
          <p>
            <b>{props.item.infomation_title}</b>
          </p>
          <br />
          {props.item.infomation}
        </Info>
      );
}

    if (props.item.infomation_type === "video") {
      return (
        <VideoInfo>
          <video muted autoPlay width={300}>
            <source
              src={process.env.REACT_APP_IMAGE_URL + props.item.infomation}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </VideoInfo>
      );
    }

    if (props.item.infomation_type === "image") {
      return (
        <>
          <b>{props.item.infomation_title}</b>
          <img
            width={300}
            src={process.env.REACT_APP_IMAGE_URL + props.item.infomation}
          />
        </>
      );
    }
  };

  

  return (
    <Wrap>
      <label>
        <input
          type={'checkbox'}
          name={props.name}
          value={props.title}
          checked={props.checked}
          onChange={(e) => {
            // e.target.value
            if(props.checked) {
              const values: string[] = props.value?.split('@') || []
              const x = values.filter(v => v !== props.title).join('@')
              e.target.value = x;
            }else {
              const values: string[] = props.value?.split('@') || []
              const x = [...values, props.title].join('@'); 
              e.target.value = x;              
            }
            
            props.onChange(e)
          }}
        />
        {convertToTitleCase(props.title)}
      </label>
      {props.item.infomation && (
        <Tooltip message={renderMessage()}>
          &nbsp;&nbsp;
          <Icon icon="info" width={15} />
        </Tooltip>
      )}
    </Wrap>
  )
}

export default RadioSelect;
