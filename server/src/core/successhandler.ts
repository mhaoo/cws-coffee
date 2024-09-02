import { HttpStatusCodes, HttpStatusMessages } from "../constants";

export class OkSuccess {
  message: string;
  status: number;
  data: any;

  constructor({
    message,
    statusCode = HttpStatusCodes.OK,
    reasonStatusCode = HttpStatusMessages.OK,
    data = {},
  }: {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    data?: any;
  }) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.data = data;
  }

  send(res: any, headers: any = {}) {
    return res.status(this.status).json(this);
  }
}

export class SuccessResponse {
  message: string;
  status: number;
  data: any;

  constructor({
    message,
    statusCode = HttpStatusCodes.OK,
    reasonStatusCode = HttpStatusMessages.OK,
    data = {},
  }: {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    data?: any;
  }) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.data = data;
  }

  send(res: any, headers: any = {}) {
    return res.status(this.status).json(this);
  }
}

export class CreatedSuccess extends SuccessResponse {
  constructor({ message, data = {} }: { message?: string; data?: any }) {
    super({
      message,
      statusCode: HttpStatusCodes.CREATED,
      reasonStatusCode: HttpStatusMessages.CREATED,
      data,
    });
  }
}

export class AcceptedSuccess extends SuccessResponse {
  constructor({ message, data = {} }: { message?: string; data?: any }) {
    super({
      message,
      statusCode: HttpStatusCodes.ACCEPTED,
      reasonStatusCode: HttpStatusMessages.ACCEPTED,
      data,
    });
  }
}

export class NoContentSuccess {
  send(res: any, headers: any = {}) {
    return res.status(HttpStatusCodes.NO_CONTENT).send();
  }
}

export class PartialContentSuccess extends SuccessResponse {
  constructor({ message, data = {} }: { message?: string; data?: any }) {
    super({
      message,
      statusCode: HttpStatusCodes.PARTIAL_CONTENT,
      reasonStatusCode: HttpStatusMessages.PARTIAL_CONTENT,
      data,
    });
  }
}
