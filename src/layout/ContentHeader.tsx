import { useRecoilValue } from "recoil";
import { headerAtom } from "../store/atom/header";
import styled from "styled-components";

const ContentHeader = () => {
  const header = useRecoilValue(headerAtom);

  return (
    <Container>
      {header.title}{" "}
      {header.nowStep > 0 && (
        <p>
          {header.nowStep}/{header.maxStep}
        </p>
      )}
    </Container>
  );
};

export default ContentHeader;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  align-items: center;

  font-size: 2rem;
  font-weight: bold;
`;
