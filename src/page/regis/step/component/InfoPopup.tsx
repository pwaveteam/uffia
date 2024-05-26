import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
`;
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
`;
const VideoInfo = styled.div`
  position: absolute;
  z-index: 999999999;
  background-color: white;
  left: 0;
  width: 100px;
  top: 1rem;
  padding: .5rem 1rem .5rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  > video {
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
`;

const InfoPopup = ({ type, content, title, onClose }: any) => {
  return (
    <Wrap>
      {type === 'text' ? (
        <Info>
          <p><b>{title}</b></p>
          <br />
          <a onClick={onClose}>닫기</a>
          {content}
        </Info>
      ) : (
        type === 'video' && (
          <VideoInfo>
            <video muted autoPlay>
              <source src={process.env.REACT_APP_IMAGE_URL + content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a onClick={onClose}>닫기</a>
          </VideoInfo>
        )
      )}
    </Wrap>
  );
};

export default InfoPopup;
