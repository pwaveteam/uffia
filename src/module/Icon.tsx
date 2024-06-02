import styled from "styled-components";

interface IconInterface {
  icon: string;
  width?: number;
}

const Icon = ({ icon, width }: IconInterface) => {
  return (
    <IconImg
      src={`/icon/${icon}.png`}
      width={width}
      icon={icon}
      alt="no"
    ></IconImg>
  );
};

export default Icon;

const IconImg = styled.img<{
  width?: number;
  icon: string;
}>`
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}px` : "50px")};
`;
