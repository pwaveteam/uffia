import styled from "styled-components";

interface ButtonInterface {
  color?: string;
  bgColor?: string;
  text: string;
  onClick?: any;
  width?: any;
  style?: any;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-weight: formal;
`;

const Index = ({
  color,
  bgColor,
  text,
  onClick,
  width,
  style,
}: ButtonInterface) => {
  return (
    <Container
      style={{
        color: color || "white",
        backgroundColor: bgColor || "#666666",
        width: width || "",
        ...style,
      }}
      onClick={(e) => onClick && onClick(e)}
    >
      {text}
    </Container>
  );
};

export default Index;
