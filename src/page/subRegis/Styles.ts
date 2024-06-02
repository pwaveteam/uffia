import styled from "styled-components";

const Styles = {
  SubWrap: styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  `,
  Title: styled.p`
    font-weight: bold;
    font-size: 0.66rem;
    margin-bottom: 0.5rem;
  `,
  TextArea: styled.textarea`
    border: none;
    width: 100%;
    height: calc(100% - 1.5rem);
  `,
  ButtonWrap: styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
  `,
};

export default Styles;
