import styled from "styled-components";

const Styles = {
  DefaultLayoutWrap: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;
    height: 5rem;
    align-items: center;
    padding: 0 5rem;
    font-size: 2rem;
    font-weight: bold;
    border-bottom: .1rem solid #eee;
    gap: 1rem;
    > p {
      font-size: 1.5rem;
      font-weight: normal;
      color: #aaa;
    }
  `,
  Content: styled.div`
    flex: 1;
  `
}

export default Styles
