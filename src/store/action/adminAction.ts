import Survey from "../../page/regis/step/Survey";
import { defaultService } from "../service";

const AdminAction = () => {
  const getList = async (setState: any) => {
    await defaultService
      .handleService({
        endPoint: "/v1/admin/bom/list",
        method: "get",
      })
      .then(
        (response) => setState(response.data.payload),
        (error) => console.log(error)
      );
  };

  const getDetail = async (seq: string, setState: any) => {
    await defaultService
      .handleService({
        endPoint: "/v1/admin/bom/detail/" + seq,
        method: "get",
      })
      .then(
        (response) => {
          // 데모 시연을 위한 로직
          // 토출부, 공급부 구동부 각각 한제품만 나오면 좋은 것 .. ?
          const paylonad = response.data.payload;

          
          let mockData = {
            "application": {
                "item": [
                    {
                        "id": 3,
                        "part_name": "BST-3L",
                        "category": "Tank option",
                        "cnt": 0,
                        "single_amount": 1800000
                    }
                ],
                "cnt": 1
            },
            "discharge": {
                "item": [
                    {
                        "id": 1,
                        "part_name": "SPP-1000",
                        "category": "PC PUMP",
                        "cnt": 0,
                        "single_amount": 16000000
                    },
                ],
                "cnt": 1
            },
            "supply": {
                "item": [
                    {
                        "id": 1,
                        "part_name": "MDR-331",
                        "category": "BARREL",
                        "cnt": 0,
                        "single_amount": 75000
                    },
                ],
                "cnt": 1
            },
            "robot": {
                "item": [
                  {
                      "id": 1,
                      "part_name": "BP-2",
                      "category": "BARREL",
                      "cnt": 0,
                      "single_amount": 100000
                  },
              ],
                "cnt": 1
            },
        }
        if(paylonad.answer['1'] === '1가지') {
          mockData = {
            "application": {
                "item": [
                    {
                        "id": 3,
                        "part_name": "MDR-331",
                        "category": "데스크탑 로봇",
                        "cnt": 0,
                        "single_amount": 1800000
                    }
                ],
                "cnt": 1
            },
            "discharge": {
                "item": [
                    {
                        "id": 1,
                        "part_name": "BV-303",
                        "category": "일반 벨브",
                        "cnt": 0,
                        "single_amount": 16000000
                    },
                ],
                "cnt": 1
            },
            "supply": {
                "item": [
                    {
                        "id": 1,
                        "part_name": "BST-5L",
                        "category": "압력탱크",
                        "cnt": 0,
                        "single_amount": 75000
                    },
                ],
                "cnt": 1
            },
            "robot": {
                "item": [
                  {
                      "id": 1,
                      "part_name": "TAD-200V",
                      "category": "Controller",
                      "cnt": 0,
                      "single_amount": 100000
                  },
              ],
                "cnt": 1
            },
        }
        }
          setState({
            ...paylonad,
            survey: {
              ...paylonad.survey,
              ...mockData,
            },
          });
        },
        (error) => console.log(error)
      );
      
  };

  const getDetail2 = async (seq: string, setState: any) => {
    await defaultService
      .handleService({
        endPoint: "/v1/admin/bom/detail/" + seq,
        method: "get",
      })
      .then(
        (response) => {
          // 데모 시연을 위한 로직
          // 토출부, 공급부 구동부 각각 한제품만 나오면 좋은 것 .. ?
          const paylonad = response.data.payload;

          
          let mockData = {
            "discharge": {
                "item": [
                    
                ],
                "cnt": 1
            },
            "supply": {
                "item": [
                    
                ],
                "cnt": 1
            },
            "robot": {
                "item": [
                  
              ],
                "cnt": 1
            },
        }
          setState({
            ...paylonad,
            survey: {
              ...paylonad.survey,
              ...mockData,
            },
          });
        },
        (error) => console.log(error)
      );
      
  };

  const sendEmail = async (email: string, subject: string, data: object) => {
    await defaultService
      .handleService({
        endPoint: "/v1/admin/email",
        method: "post",
        params: {
          email,
          subject,
          data,
        },
      })
      .then((error) => console.log(error));
  };

  const getItemList = async (setState: any) => {
    await defaultService.handleService({
      endPoint: '/v1/admin/bom/item/list',
      method: 'get'
    }).then(
      response => setState(response.data.payload),
      error => console.log(error)
    )
  }

  const saveBom = async (state: any) => {
    await defaultService.handleService({
      endPoint: '/v1/admin/bom/item/save',
      method: 'post',
      params: state
    }).then(
      response => console.log(response),
      error => console.log(error)
    )
  }

  return {
    getItemList,
    saveBom,
    getList,
    getDetail,
    getDetail2,
    sendEmail,
  };
};

export default AdminAction;
