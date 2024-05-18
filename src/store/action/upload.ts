import {defaultService} from "../service";

export const UploadAction = () => {

  const uploadImage = (file: any, type: string, setFile: any) => {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('file', file)

    defaultService.handleService({
      method: 'post',
      endPoint: '/v1/upload/',
      params: formData,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }).then(
      response => setFile(response.data.result),
      error => console.log(error)
    )
  }

  return {
    uploadImage
  }
}
