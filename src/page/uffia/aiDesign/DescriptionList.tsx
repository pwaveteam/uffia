import Button from "../../../module/UffiaButton";
import DescriptionItem from "./DescriptionItem";
import styled from "styled-components";

const DescriptionList = ({
  selectedOptions,
  setSelectedOptions,
  data,
}: any) => {
  return (
    <>
      <div style={styles.listContainer}>
        {data.map((item: any, index: any) => (
          <DescriptionItem
            key={index}
            isFirst={index === 0}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            title={item.title}
            options={item.options}
            totalRows={item.totalRows}
          />
        ))}
        <ItemContainer>
          <Title>자유 형식</Title>
          <Content>
            <UnderLineInput placeholder="원하는 요구 사항을 자유롭게 적어주세요." />
            <Button
              text="추가하기"
              outline
              variant="secondary"
              size="small"
              style={{
                height: "20px",
              }}
            />
          </Content>
        </ItemContainer>
      </div>
    </>
  );
};

const styles = {
  listContainer: {
    border: "1px solid #f0f0f0",
  },
};

export default DescriptionList;

const ItemContainer = styled.div`
  display: flex;
  align-items: stretch;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.div`
  align-items: center;

  padding-right: 20px;
  min-width: 150px;
  display: flex;

  padding-left: 3rem;

  background-color: #f0f0f0;
  color: #999999;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 60px;
`;

const UnderLineInput = styled.input`
  width: 50%;
  min-height: 60px;
  border: none;

  color: #8e8e8e;
  font-size: 1rem;

  padding-left: 1.5rem;
  outline: none;
  background-color: transparent;

  &::placeholder {
    color: #999999;
  }
`;
