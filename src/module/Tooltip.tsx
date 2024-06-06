import styled from "styled-components";

type TooltipProps = {
  children: React.ReactNode;
  message: React.ReactNode;
  title?: string;
};

const Tooltip = ({ title, children, message }: TooltipProps) => {
  return (
    <Container>
      {children}

      <Message className="tooltip">
        <Title>{title}</Title>
        {message}
      </Message>
    </Container>
  );
};

export default Tooltip;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

const Message = styled.div`
  max-width: 300px;
`;

const Container = styled.span`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }

  .tooltip {
    white-space: pre-line;
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;

    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 5px;

    font-size: 1rem;
    font-weight: 500;
    height: auto;
    letter-spacing: -0.25px;
    margin-top: 6.8px;
    padding: 1rem;
    width: max-content;
    z-index: 100;
    transform: translate(-44%, 110%);
  }

  // 말풍선 테두리와 꼬리를 위한 before, after
  .tooltip::after {
    border-color: #fff transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
  }

  .tooltip::before {
    border-color: #fff transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }
`;
