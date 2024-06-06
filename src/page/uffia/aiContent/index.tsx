import styled from "styled-components";
import ContentHeader from "./ContentHeader";
import DocumentInfo from "./DocumentInfo";
import DocumentTable, { TableColumns } from "./DocumentTable";
import { useState } from "react";
import Button from "../../../module/UffiaButton";
import { toast } from "react-toastify";
import XLSX from "xlsx-js-style";

const pastelColors = [
  "FFB3BA",
  "FFDFBA",
  "FFFFBA",
  "BAFFC9",
  "BAE1FF",
  "CBAACB",
  "FFCCE5",
  "D4A5A5",
  "A5D4A5",
  "A5A5D4",
];

const genHeaderStyle = (idx: number) => {
  return {
    ...headerStyle,
    fill: { fgColor: { rgb: pastelColors[idx % pastelColors.length] } },
  };
};

const headerStyle = {
  font: {
    bold: true,
    color: { rgb: "000000" },
    name: "함초롱바탕",
    sz: 13,
  },
  fill: { fgColor: { rgb: "BC8F8F" } },
  alignment: { horizontal: "center", vertical: "center" },
  border: {
    left: { style: "thin", color: { auto: 1 } },
    right: { style: "thin", color: { auto: 1 } },
    top: { style: "thin", color: { auto: 1 } },
    bottom: { style: "thin", color: { auto: 1 } },
  },
};

const dataStyle = {
  font: { color: { rgb: "000000" }, name: "함초롱바탕", sz: 11 },
  fill: { fgColor: { rgb: "FFFAFA" } },
  alignment: { horizontal: "center", vertical: "center" },
  border: {
    left: { style: "thin", color: { auto: 1 } },
    right: { style: "thin", color: { auto: 1 } },
    top: { style: "thin", color: { auto: 1 } },
    bottom: { style: "thin", color: { auto: 1 } },
  },
};

const defaultCoverData = {
type: "표지",
index: 0,
tableData: [
{
classification: "대분류",
property: "회사 머리말",
description: `Pulsewave X uffia Project
AI Soltuion by Business Flow`,
keyword: "RFP",
},
{
classification: "중분류",
property: "고객명",
description: `Pulsewave`,
keyword: "RFP",
},
{
classification: "소분류",
property: "설명",
description: "Vol.1 June-2024 Proposed by PV inc.",
keyword: "RFP",
},
{
classification: "소분류",
property: "날짜",
description: "June, 2024",
keyword: "RFP",
},
],
};

const defaultContentData = {
  type: "내용",
  index: 1,
  tableData: [
    {
      classification: "대분류",
      property: "설명",
      description: ``,
      keyword: "",
    },
  ],
};

const AiContent = () => {
  const [documentName, setDocumentName] = useState("프로젝트1");
  const [coverData, setCoverData] = useState<any>([defaultCoverData]);

const [contentData, setContentData] = useState<any>([
{
type: "내용",
index: 1,
tableData: [
{
classification: "대분류",
property: "설명",
description: ``,
keyword: "",
},
],
},
defaultContentData,
{
type: "내용",
index: 1,
tableData: [
{
classification: "대분류",
property: "회사 머리말",
description: `B. 가구 컨설팅 및 납품 계획`,
keyword: "",
},
{
classification: "중분류",
property: "설명",
description: `B-1. 컨설팅 진행 계획`,
keyword: "",
},
{
classification: "중분류",
property: "설명",
description: `B-2. 프로젝트 진행 계획 (납품계획)`,
keyword: "",
},
{
classification: "중분류",
property: "고객명",
description: `B-3. 일정 계획`,
keyword: "",
},
{
classification: "중분류",
property: "고객명",
description: `B-4. 품질 보증 및 사후 관리`,
keyword: "",
},
],
},
{
type: "내용",
index: 1,
tableData: [
{
classification: "중분류",
property: "설명",
description: `공간 컨셉에 대한 스토리 및 디자인 의도 파악`,
keyword: "공간, 여행, 컨셉",
},
{
classification: "소분류",
property: "설명",
description: `공간별로 여행에서 느끼는 점을 어떻게 표현하였는가?`,
keyword: "공간, 여행, 컨셉",
},
],
},
{
type: "내용",
index: 1,
tableData: [
{
classification: "중분류",
property: "설명",
description: `총 16개 층(B2~14F)`,
keyword: "RFP, 제안 범위",
},
{
classification: "소분류",
property: "설명",
description: `고품질 디자인 가구를 통해 공간의 미적
가치를 극대화하고,
사용자 편의성과 기능성을 향상`,
keyword: "RFP, 과업의 목적",
},
{
classification: "소분류",
property: "설명",
description: `여행의 편안함과 설렘을 느낄 수 있는 공간 창출
사용자 경험을 극대화하기 위해 맞춤형 가구 제작,
고품질 마감재 선택 및 최신 인테리어 트렌드 반영`,
keyword: "RFP, 과업의 이해",
},
{
classification: "소분류",
property: "설명",
description: `독창적인 디자인과 고객 맞춤형
접근 방식을 통한 설계
직원들의 일상 공간을 더욱 특별하고
기능적으로 설계하여, 사용자 만족도 극대화`,
keyword: "RFP, 과업의 기대효과",
},
],
},
]);

  const exportData = () => {
    const wb = XLSX.utils.book_new();

    const headerRow = [...coverData, ...contentData].reduce(
      (acc: any, cur: any, idx_1) => {
        const row = cur.tableData.map((_: any, idx_2: any) => {
          return {
            v: `${idx_1 + 1}-${idx_2 + 1}`,
            t: "s",
            s: genHeaderStyle(idx_1),
          };
        });
        return [...acc, ...row];
      },
      []
    );

    const dataRows = [...coverData, ...contentData].reduce(
      (acc: any, cur: any) => {
        return [
          ...acc,
          ...cur.tableData.map((data: any) => {
            return { v: data.description, t: "s", s: dataStyle };
          }),
        ];
      },
      []
    );

    const rows = [headerRow, dataRows];

    // 새로운 Sheet 객체 생성
    const ws = XLSX.utils.aoa_to_sheet(rows);

    const colWidths = headerRow.map((_: any) => 140);
    const cols = colWidths.map((width: any) => ({ wpx: width }));
    ws["!cols"] = cols;

    // workbook에 추가
    XLSX.utils.book_append_sheet(wb, ws, "사원 목록");

    // 파일 다운로드
    XLSX.writeFile(wb, `${documentName}.xlsx`);
  };

  const saveData = () => {
    toast("저장되었습니다.");
  };

  const handleClickAddCover = () => {
    const newCoverData = defaultCoverData;
    setCoverData([...coverData, newCoverData]);
  };

  const handleClickAddContent = () => {
    const newContentData = defaultContentData;
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

  const updateCoverData = (index: number, rowIndex: number, data: any) => {
    const newCoverData = coverData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: item.tableData.map((row: any, j: number) => {
            if (j === rowIndex) {
              return data;
            }
            return row;
          }),
        };
      }
      return item;
    });
    setCoverData(newCoverData);
  };

  const updateContentData = (index: number, rowIndex: number, data: any) => {
    const newContentData = contentData.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          tableData: item.tableData.map((row: any, j: number) => {
            if (j === rowIndex) {
              return data;
            }
            return row;
          }),
        };
      }
      return item;
    });
    setContentData(newContentData);
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
      <ContentHeader
        documentName={documentName}
        onChangeDocumentName={(name: string) => {
          setDocumentName(name);
        }}
      />
      <Wrapper>
        <DocumentHeader>
          <EmptySpace />
          <TableHeader>
            <Button
              text="커버 추가"
              variant="uffia"
              onClick={() => {
                handleClickAddCover();
              }}
            />
            <Button
              text="페이지 추가"
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
                  updateData={(rowIndex: number, data: any) => {
                    updateCoverData(index, rowIndex, data);
                  }}
                />
              );
            })}
            {contentData.map((item: any, index: number) => {
              return (
                <DocumentTable
                  key={index}
                  type={"content"}
                  index={index + coverData.length}
                  tableData={item.tableData}
                  onClickDelete={() => handleClickDeleteContent(index)}
                  onClickAddRow={() => handleClickAddRowContent(index)}
                  onClickDeleteRow={(rowIndex: number) => {
                    handleClickDeleteRowContent(index, rowIndex);
                  }}
                  updateData={(rowIndex: number, data: any) => {
                    updateContentData(index, rowIndex, data);
                  }}
                />
              );
            })}
            <ButtonContainer>
              <Button
                size={"large"}
                variant="uffia"
                text="저장하기"
                onClick={saveData}
                style={{
                  fontSize: "1rem",
                  padding: "0.5rem 4.5rem",
                }}
              />
              <Button
                size={"large"}
                variant="primary"
                text="추출하기"
                onClick={exportData}
                style={{
                  fontSize: "1rem",
                  padding: "0.5rem 4.5rem",
                }}
              />
            </ButtonContainer>
          </TableContainer>
        </DocumentContent>
      </Wrapper>
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
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.75rem;
  padding: 1.5rem 0;
`;

const Wrapper = styled.div`
  padding-left: 10rem;
  padding-right: 10rem;
`;
