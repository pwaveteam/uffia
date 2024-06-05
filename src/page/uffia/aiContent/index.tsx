import styled from "styled-components";
import ContentHeader from "./Contentheadet";
import DocumentInfo from "./DocumentInfo";
import DocumentTable from "./DocumentTable";
import { useState } from "react";
import Button from "../../../module/UffiaButton";

const AiContent = () => {
  const [coverData, setCoverData] = useState<any>([
    {
      type: "표지",
      index: 0,
      tableData: [
        {
          // name: "표지_01",
          // description: "표지_01",
          // value: "표지_01",
          // code: "표지_01",
        },
        {
          // name: "표지_01",
          // description: "표지_01",
          // value: "표지_01",
          // code: "표지_01",
        },
      ],
    },
  ]);

  const [contentData, setContentData] = useState<any>([
    {
      type: "내용",
      index: 1,
      tableData: [
        {
          // name: "내용_01",
          // description: "내용_01",
          // value: "내용_01",
          // code: "내용_01",
        },
        {
          // name: "내용_01",
          // description: "내용_01",
          // value: "내용_01",
          // code: "내용_01",
        },
      ],
    },
  ]);

  const handleClickAddCover = () => {
    const newCoverData = {
      type: "표지",
      index: coverData.length,
      tableData: [
        {
          // name: "표지_01",
          // description: "표지_01",
          // value: "표지_01",
          // code: "표지_01",
        },
      ],
    };
    setCoverData([...coverData, newCoverData]);
  };

  const handleClickAddContent = () => {
    const newContentData = {
      type: "내용",
      index: contentData.length,
      tableData: [
        {
          // name: "내용_01",
          // description: "내용_01",
          // value: "내용_01",
          // code: "내용_01",
        },
      ],
    };
    setContentData([...contentData, newContentData]);
  };

  const handleClickDeleteCover = (index: number) => {
    const newCoverData = coverData.filter(
      (item: any, i: number) => i !== index
    );
    setCoverData(newCoverData);
  };

  const handleClickDeleteContent = (index: number) => {
    const newContentData = contentData.filter(
      (item: any, i: number) => i !== index
    );
    setContentData(newContentData);
  };

  const handleClickAddRowCover = (index: number) => {
    const newCoverData = coverData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: [
            ...item.tableData,
            {
              // name: "표지_01",
              // description: "표지_01",
              // value: "표지_01",
              // code: "표지_01",
            },
          ],
        };
      }
      return item;
    });
    setCoverData(newCoverData);
  };

  const handleClickAddRowContent = (index: number) => {
    const newContentData = contentData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: [
            ...item.tableData,
            {
              // name: "내용_01",
              // description: "내용_01",
              // value: "내용_01",
              // code: "내용_01",
            },
          ],
        };
      }
      return item;
    });
    setContentData(newContentData);
  };

  const handleClickDeleteRowCover = (index: number, rowIndex: number) => {
    const newCoverData = coverData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: item.tableData.filter(
            (row: any, j: number) => j !== rowIndex
          ),
        };
      }
      return item;
    });
    setCoverData(newCoverData);
  };

  const handleClickDeleteRowContent = (index: number, rowIndex: number) => {
    const newContentData = contentData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: item.tableData.filter(
            (row: any, j: number) => j !== rowIndex
          ),
        };
      }
      return item;
    });
    setContentData(newContentData);
  };

  return (
    <Container>
      <ContentHeader />
      <DocumentHeader>
        <EmptySpace />
        <TableHeader>
          <Button
            text="표지 추가"
            variant="uffia"
            onClick={() => {
              handleClickAddCover();
            }}
          />
          <Button
            text="내용 추가"
            variant="secondary"
            onClick={() => {
              handleClickAddContent();
            }}
          />
        </TableHeader>
      </DocumentHeader>
      <DocumentContent>
        <DocumentInfo />
        <TableContainer>
          {coverData.map((item: any, index: number) => {
            return (
              <DocumentTable
                key={index}
                type={"cover"}
                index={index}
                tableData={item.tableData}
                onClickDelete={() => handleClickDeleteCover(index)}
                onClickAddRow={() => handleClickAddRowCover(index)}
                onClickDeleteRow={(rowIndex: number) => {
                  handleClickDeleteRowCover(index, rowIndex);
                }}
              />
            );
          })}
          {contentData.map((item: any, index: number) => {
            return (
              <DocumentTable
                key={index}
                type={"content"}
                index={index}
                tableData={item.tableData}
                onClickDelete={() => handleClickDeleteContent(index)}
                onClickAddRow={() => handleClickAddRowContent(index)}
                onClickDeleteRow={(rowIndex: number) => {
                  handleClickDeleteRowContent(index, rowIndex);
                }}
              />
            );
          })}
        </TableContainer>
      </DocumentContent>
    </Container>
  );
};

export default AiContent;

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const DocumentHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const EmptySpace = styled.div`
  width: 320px;
  padding: 0 3rem;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
`;

const DocumentContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  padding: 1.5rem;
  padding-top: 0;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
