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
          setState({
            ...paylonad,
            survey: {
              ...paylonad.survey,
              application: {
                ...paylonad.survey.application,
                item: paylonad.survey.application.item[0]
                  ? [paylonad.survey.application.item[0]]
                  : [],
              },
              discharge: {
                ...paylonad.survey.discharge,
                item: paylonad.survey.discharge.item[0]
                  ? [paylonad.survey.discharge.item[0]]
                  : [],
              },
              supply: {
                ...paylonad.survey.supply,
                item: paylonad.survey.supply.item[0]
                  ? [paylonad.survey.supply.item[0]]
                  : [],
              },
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

  return {
    getList,
    getDetail,
    sendEmail,
  };
};

export default AdminAction;
