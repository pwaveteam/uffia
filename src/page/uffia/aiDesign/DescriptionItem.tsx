import styled from "styled-components";

const DescriptionItem = ({
  isFirst,
  title,
  options,
  totalRows,
  selectedOptions,
  setSelectedOptions,
}: any) => {
  return (
    <ItemContainer>
      <Title isFirst={isFirst}>{title}</Title>
      <Options>
        {options.map((optionRow: any, rowIndex: any) => {
          const selectedValue =
            totalRows === 1
              ? selectedOptions[title]
              : selectedOptions[title + "_" + rowIndex];

          const optionRow2 =
            typeof optionRow === "function"
              ? optionRow(selectedOptions)
              : optionRow;

          return (
            <Rows key={rowIndex} isFirst={isFirst && rowIndex === 0}>
              {optionRow2.map((option: any, index: any) => (
                <Option
                  isFirst={isFirst && rowIndex === 0}
                  key={index}
                  selected={selectedValue === option}
                  onClick={() => {
                    if (totalRows === 1) {
                      setSelectedOptions({
                        ...selectedOptions,
                        [title]: option,
                      });
                    } else {
                      setSelectedOptions({
                        ...selectedOptions,
                        [title + "_" + rowIndex]: option,
                      });
                    }
                  }}
                >
                  {option}
                </Option>
              ))}
            </Rows>
          );
        })}
      </Options>
    </ItemContainer>
  );
};

export default DescriptionItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid #f0f0f0;
`;

const Title = styled.div<{
  isFirst: boolean;
}>`
  align-items: center;
  font-weight: bold;
  padding-right: 20px;
  min-width: 150px;
  display: flex;

  padding-left: 3rem;

  background-color: #eaeaea;

  ${({ isFirst }) =>
    isFirst &&
    `
    background-color: #d3dbea;
  `}
`;

const Options = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  & > div {
    min-height: 60px;
  }
`;

const Rows = styled.div<{
  isFirst: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;

  padding-left: 1.5rem;
`;

const Option = styled.div<{
  selected: boolean;
  isFirst: boolean;
}>`
  padding: 5px 15px;
  margin-right: 5px;
  margin-bottom: 5px;

  // border: 1px solid #ddd;
  border-radius: 999px;

  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 30px;
  transition: all 0.3s;

  &:hover {
    background-color: #e5e5e5;
  }

  color: #666666;
  ${({ selected }) =>
    selected &&
    `
    background-color: #e5e5e5;
  `}

  ${({ isFirst, selected }) =>
    isFirst &&
    selected &&
    `
    background-color: #d3dbea;
  `}
`;
