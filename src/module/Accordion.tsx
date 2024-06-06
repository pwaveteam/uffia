// Accordion.js
import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import IconBase from "./Icon";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  type: string;
};

const Accordion = ({ title, children, type }: AccordionProps) => {
  const [isActive, setIsActive] = useState(true);
  const animationProps = useSpring({
    maxHeight: isActive ? "500px" : "0px",
    opacity: isActive ? 1 : 0,
    config: { tension: 220, friction: 20 },
  });

  const handleToggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <AccordionWrapper>
      <AccordionItem>
        <AccordionTitle type={type} onClick={handleToggle}>
          <span></span>
          {title}
          <Icon icon="/arrow" width={12} height={7} />
        </AccordionTitle>
        <AccordionContent style={animationProps}>{children}</AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default Accordion;

const AccordionWrapper = styled.div`
  overflow: hidden;
`;

const AccordionItem = styled.div``;

const AccordionTitle = styled.div<{
  type: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #fff;
  padding: 1rem;
  cursor: pointer;

  background-color: #313f5b;

  ${({ type }) =>
    type === "content" &&
    `
    background-color: #8e8e8e;
    color: #000;
  `}
`;

const AccordionContent = styled(animated.div)`
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #fff;
`;

const Icon = styled(IconBase)`
  color: #fff;
`;
