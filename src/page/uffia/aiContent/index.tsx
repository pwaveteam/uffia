import styled from "styled-components";
import ContentHeader from "./ContentHeader";
import DocumentInfo from "./DocumentInfo";
import DocumentTable, { TableColumns } from "./DocumentTable";
import { useState } from "react";
import Button from "../../../module/UffiaButton";
import { toast } from "react-toastify";
import XLSX from "xlsx-js-style";

const AiContent = () => {
  const [coverData, setCoverData] = useState<any>([
    {
      type: "표지",
      index: 0,
      tableData: [
        {
          classification: "대분류",
          property: "고객명",
          description: "네이버",
          keyword: "-",
        },
        {
          classification: "중분류",
          property: "회사 머리말",
          description:
            "사용자의 업장을 가장 깊이 있게 고민하고 기업의 문화라치를 실현시킬 수 있는 공간을 창출합니다. 여러 고객 접점을 다양한 방식으로",
          keyword: "문서, 가치, 공간컨셉, 창의적",
        },
        {
          classification: "소분류",
          property: "날짜",
          description: "2024.06.05",
          keyword: "오늘 날짜",
        },
      ],
    },
  ]);

  const [contentData, setContentData] = useState<any>([
    {
      type: "내용",
      index: 1,
      tableData: [{}, {}, {}],
    },
  ]);

  const exportData = () => {
    const wb = XLSX.utils.book_new();
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

    // 열의 폭을 정의
    const colWidths = [80, 120, 300, 80, 30];

    // cols 속성을 사용하여 각 열의 폭을 조절
    const cols = colWidths.map((width) => ({ wpx: width }));

    const headerRow = [
      { v: "분류", t: "s", s: headerStyle },
      { v: "항목 속성", t: "s", s: headerStyle },
      { v: "내용", t: "s", s: headerStyle },
      { v: "키워드", t: "s", s: headerStyle },
      { v: "ID", t: "s", s: headerStyle },
    ];

    const flattenCoverData = coverData.reduce(
      (acc: any, cur: any) => [...acc, ...cur.tableData],
      []
    );
    const flattenContentData = contentData.reduce(
      (acc: any, cur: any) => [...acc, ...cur.tableData],
      []
    );

    // classification
    // property
    // description
    // keyword
    // id
    const dataRows = [...flattenCoverData, ...flattenContentData].map(
      (data: any) => [
        { v: data.classification, t: "s", s: dataStyle }, // 사원번호
        { v: data.property, t: "s", s: dataStyle }, // 이름
        { v: data.description, t: "s", s: dataStyle }, // 부서
        { v: data.keyword, t: "s", s: dataStyle }, // 직급
        { v: data.id, t: "s", s: dataStyle }, // 사원번호
      ]
    );

    const rows = [headerRow, ...dataRows];

    // 새로운 Sheet 객체 생성
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // cols 속성 적용
    ws["!cols"] = cols;

    // workbook에 추가
    XLSX.utils.book_append_sheet(wb, ws, "사원 목록");

    // 파일 다운로드
    XLSX.writeFile(wb, "ai_content_list.xlsx");
  };

  const saveData = () => {
    toast("저장되었습니다.");
  };

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
                index={index}
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
            {/* <CSVLink
              data={[...coverData, ...contentData].map((data) => {
                return data.tableData.map((row: any) => {
                  return TableColumns.map((column) => {
                    return row[column.key];
                  });
                });
              })}
              headers={TableColumns.map((column) => {
                return {
                  label: column.title,
                  key: column.key,
                };
              })}
              filename={"CSV 데이터"}
              onClick={() => {
                console.log("링크 클릭함");
              }}
            >
              Download me
            </CSVLink> */}
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.75rem;
  padding: 1.5rem 0;
`;
