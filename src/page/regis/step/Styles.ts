import styled from "styled-components";

const Styles = {
  ContentWrap: styled.div<{
    step: string;
  }>`
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 10rem;
    justify-content: center;
  `,
  PersonalInputWrap: styled.div<{ require?: string }>`
    display: flex;
    flex-direction: column;
    min-width: 40%;
    padding: 0.5rem 1rem;
    > p {
      padding: 0;
      margin: 1rem 0 0.5rem;
      color: black;
      font-weight: bold;
      ${(props) =>
        props.require &&
        `&::after {
              content: '* ';
              color: red
        }`}
    }
    input,
    select {
      flex: 1;
      padding: 0.5rem 1rem;
      font-weight: normal;
      outline-color: lightgray;
      border-radius: 6px;
      border-width: 1px;
    }
    > div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      > select {
        flex: none;
      }
    }
  `,
  SurveyWrap: styled.div<{ require?: string }>`
    display: flex;
    flex-direction: column;
    min-width: 40%;

    gap: 1rem;
  `,
  ButtonWrap: styled.div`
    position: absolute;
    right: 0;
    bottom: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  `,
};

export default Styles;
