import styled from "styled-components";

const Styles = {
  SubWrap: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  `,
  ContentBody: styled.div<{flexSize?: string}>`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flexSize || '1'};
    min-width: calc(33% - 2rem);
  `,
  Title: styled.p`
    font-weight: bold;
    font-size: 1rem;
  `,
  Content: styled.div`
    flex: 1;
    background-color: #f5f5f5;
    padding: .5rem 1rem;
    border-radius: .5rem;
  `,
  TextArea: styled.textarea`
    background-color: #f5f5f5;
    border: none;
    width: 100%;
    height: 100%;
  `
}

export default Styles
