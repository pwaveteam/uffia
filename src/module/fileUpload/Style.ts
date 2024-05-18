import styled from "styled-components";

const Style = {
  Wrap: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  FileName: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    padding: .5rem 1rem;
    border-radius: .5rem;
    color: #777;
  `,
  UploadButton: styled.label`
    display: flex;
    font-size: 1rem;
    background-color: #666;
    padding: .5rem 1rem;
    border-radius: .5rem;
    cursor: pointer;
    text-align: center;
    color: #FFF;
    > input {
      display: none;
    }
  `,
  ImageBody: styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    > img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      max-height: 10rem;
    }
  `
}

export default Style
