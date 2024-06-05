import styled from "styled-components";
import Accordion from "../../../module/Accordion";
import Button from "../../../module/UffiaButton";
import SelectInput from "../../../module/SelectInput";
import Textarea from "../../../module/Textarea";
import InputBase from "../../../module/Input";
import Icon from "../../../module/Icon";
import SwitchBase from "../../../module/Switch";

// classification
// property
// description
// keyword
// id

export const TableColumns = [
  {
    title: "분류",
    dataIndex: "classification",
    key: "classification",
    width: "15%",
    render: (text: any, record: any) => {
      return (
        <Wrapper>
          <SelectInput
            options={classification.map((item) => {
              return {
                value: item.value,
                label: item.type,
              };
            })}
            value={record.classification}
            onChange={(e: any) => {
              record.updateData(record.index, {
                ...record,
                classification: e.target.value,
              });
            }}
          />
        </Wrapper>
      );
    },
  },
  {
    title: "항목 속성",
    dataIndex: "property",
    key: "property",
    width: "15%",
    render: (text: any, record: any) => {
      return (
        <Wrapper>
          <SelectInput
            value={record.property}
            options={propertyOptions}
            onChange={(e: any) => {
              record.updateData(record.index, {
                ...record,
                property: e.target.value,
              });
            }}
          />
        </Wrapper>
      );
    },
  },
  {
    title: "내용",
    dataIndex: "description",
    key: "description",
    width: "30%",
    render: (text: any, record: any) => {
      return (
        <SwitchWrapper>
          <Switch
            checked={true}
            onChange={() => {
              console.log("switch");
            }}
            size="small"
          />
          <Textarea
            value={record.description}
            onChange={(e: any) => {
              record.updateData(record.index, {
                ...record,
                description: e.target.value,
              });
            }}
          />
        </SwitchWrapper>
      );
    },
  },
  {
    title: "Keyword",
    dataIndex: "keyword",
    key: "keyword",
    width: "30%",
    render: (text: any, record: any) => {
      return (
        <SwitchWrapper>
          <Switch
            checked={true}
            onChange={() => {
              console.log("switch");
            }}
            size="small"
          />
          <Textarea
            value={record.keyword}
            onChange={(e: any) => {
              record.updateData(record.index, {
                ...record,
                keyword: e.target.value,
              });
            }}
          />
        </SwitchWrapper>
      );
    },
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "10%",
    render: (text: any, record: any) => {
      return (
        <Wrapper>
          <Input
            placeholder=""
            value={`${record.typeIndex + 1}-${record.index + 1}`}
            onChange={(e: any) => {
              record.updateData(record.index, {
                ...record,
                id: e.target.value,
              });
            }}
          />
        </Wrapper>
      );
    },
  },
  {
    title: "편집",
    dataIndex: "delete",
    key: "delete",
    width: "10%",
    render: (text: any, record: any) => {
      return (
        <Wrapper
          onClick={() => {
            record.onClickDeleteRow(record.index);
          }}
        >
          <Icon icon="trash" width={30} height={30} />
        </Wrapper>
      );
    },
  },
];

const classification = [
  {
    type: "대분류",
    value: "대분류",
  },
  {
    type: "중분류",
    value: "중분류",
  },
  {
    type: "소분류",
    value: "소분류",
  },
];

const propertyOptions = [
  {
    value: "고객명",
    label: "고객명",
  },
  {
    value: "회사 머리말",
    label: "회사 머리말",
  },
  {
    value: "날짜",
    label: "날짜",
  },
  {
    value: "제품명",
    label: "제품명",
  },
  {
    value: "요약",
    label: "요약",
  },
  {
    value: "설명",
    label: "설명",
  },
];

type DocumentInfoProps = {
  type: string;
  index: number;
  tableData: any;
  onClickDelete: () => void;
  onClickAddRow?: () => void;
  onClickDeleteRow?: (rowIndex: number) => void;
  updateData?: (rowIndex: number, data: any) => void;
};

const getNumber = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

const DocumentTable = ({
  type,
  index,
  tableData,
  onClickDelete,
  onClickAddRow,
  onClickDeleteRow,
  updateData,
}: DocumentInfoProps) => {
  const title =
    type === "cover"
      ? `표지_${getNumber(index + 1)}`
      : `페이지_${getNumber(index + 1)}`;

  return (
    <DocumentTableContainer>
      <Header>
        <DeleteButton onClick={onClickDelete}>x</DeleteButton>
      </Header>
      <Accordion type={type} title={`${title}`}>
        <AccordionContent>
          <Button
            text="행추가"
            onClick={onClickAddRow}
            style={{
              width: "50px",
            }}
          />
          <TableContainer>
            <TableHeader>
              {TableColumns.map((column: any) => (
                <TableHeaderColumn width={column.width} type={type}>
                  {column.title}
                </TableHeaderColumn>
              ))}
            </TableHeader>
            <TableBody>
              {tableData.map((data: any, _index: number) => (
                <TableRow>
                  {TableColumns.map((column: any) => (
                    <TableColumn width={column.width}>
                      {column.render(data[column.dataIndex], {
                        ...data,
                        typeIndex: index,
                        index: _index,
                        onClickDeleteRow,
                        updateData,
                      })}
                    </TableColumn>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </AccordionContent>
      </Accordion>
    </DocumentTableContainer>
  );
};

const TableContainer = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #fff;
  font-size: 0.75rem;
`;

const TableHeaderColumn = styled.div<{ type: string; width: string }>`
  width: ${(props) => props.width};
  padding: 1rem 0;

  background-color: #313f5b;

  text-align: center;

  ${({ type }) =>
    type === "content" &&
    `
    background-color: #8e8e8e;
    color: #000;
  `}
`;

const TableColumn = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  padding-top: 0.5rem;

  text-align: center;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  gap: 0.25rem;
  background-color: #fff;

  border-bottom: 1px solid #e0e0e0;
`;

export default DocumentTable;

const DocumentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;

  padding: 0 1rem 1rem 1rem;
  min-width: 1200px;
`;

const Header = styled.div`
  display: flex;

  justify-content: end;
  padding: 1rem;
`;

const DeleteButton = styled.div`
  color: #e0e0e0;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding-top: 1rem;
  background-color: #f0f0f0;
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Switch = styled(SwitchBase)``;

const Wrapper = styled.div`
  padding-top: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled(InputBase)`
  height: 2.8rem;
  color: #8e8e8e;
`;
