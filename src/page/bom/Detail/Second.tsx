import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Icon from "../../../module/Icon";
import SearchInput from "../../../module/searchInput";
import AdminAction from "../../../store/action/adminAction";
import { headerAtom } from "../../../store/atom/header";
import { MemoInput } from './Style';

function generateUUID() {
  let d = new Date().getTime(); // 현재 시간의 타임스탬프를 가져옴
  let d2 = (performance && performance.now && (performance.now()*1000)) || 0; // 성능을 위한 마이크로초 타임스탬프

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16; // 0부터 15까지의 임의의 숫자를 생성
      if(d > 0){ // 최초 타임스탬프 사용
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else { // 성능 타임스탬프 사용
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r&0x3|0x8)).toString(16); // 'x'는 임의의 숫자, 'y'는 8-11 범위의 임의의 숫자
  });
}


const firstKey = ['제어부']
const secondKey = ['구매', '전장외주', '기타요소']
const thirdKey = ['기타 구매', '기타 구매',  '기타 구매']
const third = ['discharge', 'supply', 'robot']


const Index = () => {
  const { seq } = useParams();

  const setHeader = useSetRecoilState(headerAtom);

  useEffect(() => {

    setHeader({
      title: "BOM",
      maxStep: 0,
      nowStep: 0,
    });
  }, []);

  const [tableSpan, setTableSpan] = useState({
    first: [0],
    second: [0],
  });

  console.log(tableSpan)

  const [isDrawing, setIsDrawing] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [list, setList] = useState<any>({
    discharge: [],
    supply: [],
    robot: [],
  })

  let rowIndex = 0;
  let targetRow = 0;
  const columns = 13;

  const [state, setState] = useState<any>({});
  const [price, setPrice] = useState([0,0,0,0,0]);

  const { getDetail2, getItemList, saveBom } = AdminAction();

  const handleAppendRow = (key: string) => {
    setState((prevState:any) => {
      let temp = {...prevState}
      temp.survey[key].item.push({
        id: generateUUID(),
        single_amount: 0,
      })
      return temp
    })
  }


  const handleUpdateState = (key: string, idx: number, partName: string) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      const item = list[key].filter((it: any) => it.part_name === partName)[0]
      try {
        temp.survey[key].item[idx] = item
      }catch (e){
        temp.survey[key].item.push(item)
      }
      // console.log(temp.survey[key].item[idx])
      return temp;
    });
  }

  const handleUpdateStateCnt = (key: string, idx: number, num: number) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      temp.survey[key].cnt = temp.survey[key].cnt + num < 0 ? 0 : temp.survey[key].cnt + num;
      return temp;
    });
  }

  const handleUpdateMemo = (e: any, key: string) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      temp.survey[key].memo = e.target.value
      return temp;
    });
  }

  const returnList = (currentSecondIndex: number) => {
    switch (currentSecondIndex) {
      case 0:
        return list.discharge
      case 1:
        return list.supply
      case 2:
        return list.robot
      default:
        return []
    }
  }

  useEffect(() => {
    seq && getDetail2(seq, setState);
    getItemList(setList)
  }, [seq]);

  useEffect(() => {
    if (state?.survey) {

      setPrice([
        state?.survey.discharge.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
        state?.survey.supply.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
        state?.survey.robot.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
      ])

      setTableSpan({
        first: [
          (Number(state?.survey.discharge.item.length) || 1) + 1 + 
          (Number(state?.survey.supply.item.length) || 1) + 1 + 
          (Number(state?.survey.robot.item.length) || 1) + 1,
        ],
        second: [
          (Number(state?.survey.discharge.item.length) || 1) + 1,
          (Number(state?.survey.supply.item.length) || 1) + 1,
          (Number(state?.survey.robot.item.length) || 1) + 1,
        ],
      });
    }
  }, [state]);

  useEffect(() => {
    setTotalRows(tableSpan.first.reduce((acc, cur) => acc + cur, 0));
  }, [tableSpan]);

  useEffect(() => {
    if (tableSpan.first[0] > 0) setIsDrawing(true);
  }, [tableSpan]);

  return (
    <>
      {new Array(totalRows).fill(1).map((_, i) => {
            let firstTd = null;
            let secondTd = null;
            let isSecondTdFirstRender = false;
            let isSecondTdLastRender = false;
            const idx = i - targetRow

            let currentFirstIndex = tableSpan.first.findIndex((span, idx) => {
              const sum = tableSpan.first.slice(0, idx + 1).reduce((a, c) => a + c, 0);
              return rowIndex < sum;
            });

            let currentSecondIndex = tableSpan.second.findIndex((span, idx) => {
              const sum = tableSpan.second.slice(0, idx + 1).reduce((a, c) => a + c, 0);
              return rowIndex < sum;
            });

            

            // 첫 번째 행인지 확인
            if (rowIndex === (currentFirstIndex > 0 ? tableSpan.first.slice(0, currentFirstIndex).reduce((a, c) => a + c, 0) : 0)) {
              firstTd = <td className="dept1" rowSpan={tableSpan.first[currentFirstIndex]}>{firstKey[currentFirstIndex]}</td>;
            }

            // 첫 번째 행인지 확인
            if (rowIndex === (currentSecondIndex > 0 ? tableSpan.second.slice(0, currentSecondIndex).reduce((a, c) => a + c, 0) : 0)) {
              secondTd = <td className="dept2" rowSpan={tableSpan.second[currentSecondIndex]}>{secondKey[currentSecondIndex]}
              <AddButton className={'dept3-add-btn'} onClick={() => {handleAppendRow(third[currentSecondIndex])}}>+</AddButton>
              </td>;
              isSecondTdFirstRender = true;
              targetRow = rowIndex; // 이 행이 두 번째 td가 첫 번째로 렌더링되는 행
            }

            // 마지막 행인지 확인
            if (rowIndex === tableSpan.second.slice(0, currentSecondIndex + 1).reduce((a, c) => a + c, 0) - 1) {
              isSecondTdLastRender = true;
            }

            rowIndex++;

            return (
              <tr key={i}>
                {firstTd}
                {secondTd}
                
                {new Array(columns + 1).fill(1).map((_, j) => {
                  const current =
                  state.survey[third[currentSecondIndex]]?.item[
                    i - targetRow
                  ];

                  if (isSecondTdLastRender) {
                    if (j === 0) return <td className="bottom" colSpan={columns + 1} key={j}>
                      <MemoInput
                        type={'text'}
                        value={state.survey[third[currentSecondIndex]].memo || ''}
                        placeholder={'메모를 입력해 주세요'}
                        onChange={(e:any) => handleUpdateMemo(e, third[currentSecondIndex])}
                      />
                    </td>;
                    else return null;
                  } else {
                    switch (j) {
                      case 0:
                        return <td className="top" key={j}>
                          {isSecondTdFirstRender ? null : null }
                          {isSecondTdFirstRender ? thirdKey[currentSecondIndex] : ''}
                        </td>
                      case 1:
                        return <td className="top" key={j}>
                          {isSecondTdFirstRender ? state.survey[third[currentSecondIndex]].item[i - targetRow]?.category : ''}
                        </td>
                      case 2:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '제품명' : ''}</td>
                      case 3:
                        return <td className="top" key={j}>
                          <SearchInput
                            key={generateUUID()}
                            value={state.survey[third[currentSecondIndex]]?.item[i - targetRow]?.part_name}
                            setValue={(name: string) => handleUpdateState(third[currentSecondIndex], idx, name)}
                            list={returnList(currentSecondIndex)}
                          />
                        </td>
                      case 4:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '변경' : ''}</td>
                      
                      case 5:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '옵션' : ''}</td>
                      case 6:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? state.survey[third[currentSecondIndex]].cnt : ''}</td>
                      case 7:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? 'EA' : ''}</td>
                      case 8:
                        return <td className="top" key={j} >
                          {isSecondTdFirstRender ? <button onClick={() => handleUpdateStateCnt(third[currentSecondIndex],i - targetRow, 1)}> + </button>
                            : ''}
                        </td>
                      case 9:
                        return <td className="top" key={j} >
                          {isSecondTdFirstRender ? <button onClick={() => handleUpdateStateCnt(third[currentSecondIndex],i - targetRow, -1)} >-</button> : ''}
                        </td>
                      case 10:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '단가' : ''}</td>
                      case 11:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? (price[currentSecondIndex]).toLocaleString('KO-KR') : ''}</td>
                      case 12:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '원' : ''}</td>
                        case 13:
                          return (
                            <td className="top" key={j}>
                              <div
                                onClick={() => {
                                  // delete row i
                                  const newState = JSON.parse(JSON.stringify(state))
                                  const newItem = newState.survey[
                                    third[currentSecondIndex]
                                  ].item.filter(
                                    (it: any) => it.id !== current.id
                                  );


                                  setState({
                                    ...newState,
                                    survey: {
                                      ...newState.survey,
                                      [third[currentSecondIndex]]: {
                                        ...newState.survey[
                                          third[currentSecondIndex]
                                        ],
                                        item: newItem,
                                      },
                                    },
                                  });
                                }}
                              >
                                <Icon width={20} icon="trash" />
                              </div>
                            </td>
                          );
                      default:
                        return <td className="top" key={j} />
                    }
                  }
                })}
              </tr>
            );
          })}
              </>
  );
};

export default Index;

const AddButton = styled.button`
  border: none;
  align-item: center;
  margin-left: 0.5rem;
`