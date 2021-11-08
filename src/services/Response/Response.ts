interface IResponse {
  status: string,
  success: boolean,
  data: any,
  message: string
}

export class ResponseService implements IResponse {

  constructor (_status?, _success?, _data?, _message?) {
    this.status = _status;
    this.success = _success;
    this.data = _data;
    this.message = _message;
  }
  status;
  success;
  data;
  message;

} 

