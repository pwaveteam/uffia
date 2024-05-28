import styled from "styled-components";

interface ButtonInterface {
  color?: string,
  bgColor?: string,
  text: string,
  onClick?: any,
  width?: any
}

const Container = styled.div`
  cursor: pointer;
  padding: .5rem 2rem;
  border-radius: .5rem;
  font-weight: formal;
`

const Index = ({
                 color, bgColor, text, onClick, width
               }: ButtonInterface) => {
  return <Container style={{
    color: color || 'white',
    backgroundColor: bgColor || '#666666',
    width: width || '100%'
  }}
  onClick={(e) => onClick && onClick(e)}>
    {text}
  </Container>
}

export default Index
