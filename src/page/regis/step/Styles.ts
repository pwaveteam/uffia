import styled from "styled-components";

const Styles = {
  Container: styled.div`
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 2rem 5rem;
  `,
  ContentWrap: styled.div`
    display: flex;
    flex-direction: row;
    //flex: 1;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  `,
  PersonalInputWrap: styled.div<{ require?: string }>`
    display: flex;
    flex-direction: column;
    min-width: 40%;
    padding: .5rem 1rem;
    > p {
      padding: 0;
      margin: 1rem 0 .5rem;
      color: black;
      font-weight: bold;
      ${props => props.require && `&::after {
                                                  content: '* ';
                                                  color: red
                                           }`}
    }
    input, select{
      flex: 1;
      padding: .5rem 1rem;
      font-weight: normal;
      outline-color: lightgray;
      border-radius: 6px;
      border-width: 1px;
    }
    >div{
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
    
    > p {
      font-size: 2rem;
    }
    
    > div {
      display: flex;
      flex-direction: column;
      >div {
        padding: 1rem;
        //padding: 2rem 2rem 2rem 0.5rem;
        //font-weight: bold;
      }
    }
  `,
  ButtonWrap: styled.div`
    position: absolute;
    right: 0;
    bottom: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  `,
}

export default Styles
