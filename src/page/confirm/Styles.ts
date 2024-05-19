import styled from "styled-components";

const Styles = {
  Wrap: styled.div`
    height: calc(100% - 8rem);
  `,

  ConfirmWrap: styled.div`
    padding-top: 1rem;
    display: flex;
    gap: 1rem;
    height: 100%;
    > div:not(:last-child) {
      border-right: .1rem solid #eee;
    }
  `,

  ConfirmPerson: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 2rem;
    > div {
      p.title {
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: .5rem;
      }
      p.content {
        font-weight: normal;
        font-size: 1rem;
        color: #777;
      }
    }
  `,
  ConfirmSurvey: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 4;
    p{
      font-size: 1rem;
      font-weight: bold;
    }
    > div {
      display: flex;
      flex-direction: row;
      gap: .5rem;
      > div {
        display: flex;
        p{
          font-weight: normal;
        }
        p.red {
          color: red;
        } 
        p.answer{
          color: #777;
        }
      }
    }
  `,
  ConfirmETC: styled.div`
    flex: 1;
    > div {
      p.title {
        font-size: 1.2rem;
        font-weight: bold;
      }
      p.desc {
        font-size: 1rem;
        font-weight: normal;
        padding-bottom: 1rem;
      }
    }
  `
}

export default Styles
