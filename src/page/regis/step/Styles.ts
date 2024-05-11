import styled from "styled-components";

const Styles = {
  Container: styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 2rem 5rem;
  `,
  ContentWrap: styled.div`
    flex: 1;
  `,
  ButtonWrap: styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-end;
  `,
}

export default Styles
