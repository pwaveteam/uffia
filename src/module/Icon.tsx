import styled from "styled-components";

interface IconInterface {
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Icon = ({ icon, width, height, onClick }: IconInterface) => {
  return (
    <IconImg
      src={`/icon/${icon}.png`}
      width={width}
      height={height}
      icon={icon}
      alt="no"
      onClick={onClick}
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
