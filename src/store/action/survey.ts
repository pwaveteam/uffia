import {defaultService} from "../service";

const SurveyAction = () => {
  return {
    getSurveySize: async (): Promise<{ max_value: number }> =>
      await defaultService.handleService({
        method: 'get',
        endPoint: `/v1/survey/size`
      }).then(
        response => response.data,
        error => console.log(error)
      ),

    getSurvey: async (seq: number) =>
      await defaultService.handleService({
        method: 'get',
        endPoint: `/v1/survey/step/${seq}`
      }).then(
        response => response.data,
        error => console.log(error)
      ),

    postSurvey: async (answer: any) =>
      await defaultService.handleService({
        method: 'post',
        endPoint: `/v1/survey/infoEquip`,
        params: {
          answer: answer
        }
      }).then(
        response => response.data,
        error => console.log(error)
      ),

    saveSurvey: async (body: any) =>
      await defaultService.handleService({
        method: 'post',
        endPoint: `/v1/survey/saveSurvey`,
        params: {
          ...body
        }
      }).then(
        response => response.data,
        error => console.log(error)
      ),

    getBom: async (seq: string) =>
      await defaultService.handleService({
        method: 'get',
        endPoint: `/v1/survey/bom/${seq}`
      }).then(
        response => response.data,
        error => console.log(error)
      )
  }
}

export default SurveyAction
