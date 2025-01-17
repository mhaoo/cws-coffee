interface HttpStatusCodes {
  CONTINUE: number;
  SWITCHING_PROTOCOLS: number;
  PROCESSING: number;
  OK: number;
  CREATED: number;
  ACCEPTED: number;
  NON_AUTHORITATIVE_INFORMATION: number;
  NO_CONTENT: number;
  RESET_CONTENT: number;
  PARTIAL_CONTENT: number;
  MULTI_STATUS: number;
  MULTIPLE_CHOICES: number;
  MOVED_PERMANENTLY: number;
  MOVED_TEMPORARILY: number;
  SEE_OTHER: number;
  NOT_MODIFIED: number;
  USE_PROXY: number;
  TEMPORARY_REDIRECT: number;
  PERMANENT_REDIRECT: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  PAYMENT_REQUIRED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  METHOD_NOT_ALLOWED: number;
  NOT_ACCEPTABLE: number;
  PROXY_AUTHENTICATION_REQUIRED: number;
  REQUEST_TIMEOUT: number;
  CONFLICT: number;
  GONE: number;
  LENGTH_REQUIRED: number;
  PRECONDITION_FAILED: number;
  REQUEST_TOO_LONG: number;
  REQUEST_URI_TOO_LONG: number;
  UNSUPPORTED_MEDIA_TYPE: number;
  REQUESTED_RANGE_NOT_SATISFIABLE: number;
  EXPECTATION_FAILED: number;
  IM_A_TEAPOT: number;
  INSUFFICIENT_SPACE_ON_RESOURCE: number;
  METHOD_FAILURE: number;
  MISDIRECTED_REQUEST: number;
  UNPROCESSABLE_ENTITY: number;
  LOCKED: number;
  FAILED_DEPENDENCY: number;
  PRECONDITION_REQUIRED: number;
  TOO_MANY_REQUESTS: number;
  REQUEST_HEADER_FIELDS_TOO_LARGE: number;
  UNAVAILABLE_FOR_LEGAL_REASONS: number;
  INTERNAL_SERVER_ERROR: number;
  NOT_IMPLEMENTED: number;
  BAD_GATEWAY: number;
  SERVICE_UNAVAILABLE: number;
  GATEWAY_TIMEOUT: number;
  HTTP_VERSION_NOT_SUPPORTED: number;
  INSUFFICIENT_STORAGE: number;
  NETWORK_AUTHENTICATION_REQUIRED: number;
}

export const HttpStatusCodes: HttpStatusCodes = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  MOVED_TEMPORARILY: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  INSUFFICIENT_SPACE_ON_RESOURCE: 419,
  METHOD_FAILURE: 420,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  INSUFFICIENT_STORAGE: 507,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};
