import styled from "styled-components";

const Styles = {
  Wrap: styled.div`
    height: calc(100% - 8rem);
  `,

  ConfirmWrap: styled.div`
    padding: 1.5rem 2rem;

    display: flex;
    gap: 1rem;
    height: 45rem;
    > div:not(:last-child) {
      border-right: 0.1rem solid #eee;
    }
  `,

  ConfirmPerson: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 2rem;

    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
    padding: 1rem;
  `,
  ConfirmSurvey: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1.5rem;

    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
    padding: 1rem;

    flex: 4;

    > div {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      > div {
        display: flex;
        p.red {
          color: red;
        }
      }
    }
  `,
  ConfirmETC: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
  `,
  ButtonWrap: styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    padding-right: 2rem;

    > button {
      min-width: 10rem;

      padding: 0.5rem 1rem;
      color: white;
      border: none;
      border-radius: 0.5rem;

      &:nth-child(1) {
        background-color: #99210e;
      }
    }
  `,
};

export default Styles;
