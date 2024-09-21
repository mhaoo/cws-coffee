interface HttpStatusMessages {
  ACCEPTED: string;
  BAD_GATEWAY: string;
  BAD_REQUEST: string;
  CONFLICT: string;
  CONTINUE: string;
  CREATED: string;
  EXPECTATION_FAILED: string;
  FAILED_DEPENDENCY: string;
  FORBIDDEN: string;
  GATEWAY_TIMEOUT: string;
  GONE: string;
  HTTP_VERSION_NOT_SUPPORTED: string;
  IM_A_TEAPOT: string;
  INSUFFICIENT_SPACE_ON_RESOURCE: string;
  INSUFFICIENT_STORAGE: string;
  INTERNAL_SERVER_ERROR: string;
  LENGTH_REQUIRED: string;
  LOCKED: string;
  METHOD_FAILURE: string;
  METHOD_NOT_ALLOWED: string;
  MOVED_PERMANENTLY: string;
  MOVED_TEMPORARILY: string;
  MULTI_STATUS: string;
  MULTIPLE_CHOICES: string;
  NETWORK_AUTHENTICATION_REQUIRED: string;
  NO_CONTENT: string;
  NON_AUTHORITATIVE_INFORMATION: string;
  NOT_ACCEPTABLE: string;
  NOT_FOUND: string;
  NOT_IMPLEMENTED: string;
  NOT_MODIFIED: string;
  OK: string;
  PARTIAL_CONTENT: string;
  PAYMENT_REQUIRED: string;
  PERMANENT_REDIRECT: string;
  PRECONDITION_FAILED: string;
  PRECONDITION_REQUIRED: string;
  PROCESSING: string;
  PROXY_AUTHENTICATION_REQUIRED: string;
  REQUEST_HEADER_FIELDS_TOO_LARGE: string;
  REQUEST_TIMEOUT: string;
  REQUEST_TOO_LONG: string;
  REQUEST_URI_TOO_LONG: string;
  REQUESTED_RANGE_NOT_SATISFIABLE: string;
  RESET_CONTENT: string;
  SEE_OTHER: string;
  SERVICE_UNAVAILABLE: string;
  SWITCHING_PROTOCOLS: string;
  TEMPORARY_REDIRECT: string;
  TOO_MANY_REQUESTS: string;
  UNAUTHORIZED: string;
  UNAVAILABLE_FOR_LEGAL_REASONS: string;
  UNPROCESSABLE_ENTITY: string;
  UNSUPPORTED_MEDIA_TYPE: string;
  USE_PROXY: string;
  MISDIRECTED_REQUEST: string;
  SECURITY_BREACH: string;
}

export const HttpStatusMessages: HttpStatusMessages = {
  ACCEPTED: "Accepted",
  BAD_GATEWAY: "Bad Gateway",
  BAD_REQUEST: "Bad Request",
  CONFLICT: "Conflict",
  CONTINUE: "Continue",
  CREATED: "Created",
  EXPECTATION_FAILED: "Expectation Failed",
  FAILED_DEPENDENCY: "Failed Dependency",
  FORBIDDEN: "Forbidden",
  GATEWAY_TIMEOUT: "Gateway Timeout",
  GONE: "Gone",
  HTTP_VERSION_NOT_SUPPORTED: "HTTP Version Not Supported",
  IM_A_TEAPOT: "I'm a teapot",
  INSUFFICIENT_SPACE_ON_RESOURCE: "Insufficient Space on Resource",
  INSUFFICIENT_STORAGE: "Insufficient Storage",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  LENGTH_REQUIRED: "Length Required",
  LOCKED: "Locked",
  METHOD_FAILURE: "Method Failure",
  METHOD_NOT_ALLOWED: "Method Not Allowed",
  MOVED_PERMANENTLY: "Moved Permanently",
  MOVED_TEMPORARILY: "Moved Temporarily",
  MULTI_STATUS: "Multi-Status",
  MULTIPLE_CHOICES: "Multiple Choices",
  NETWORK_AUTHENTICATION_REQUIRED: "Network Authentication Required",
  NO_CONTENT: "No Content",
  NON_AUTHORITATIVE_INFORMATION: "Non Authoritative Information",
  NOT_ACCEPTABLE: "Not Acceptable",
  NOT_FOUND: "Not Found",
  NOT_IMPLEMENTED: "Not Implemented",
  NOT_MODIFIED: "Not Modified",
  OK: "OK",
  PARTIAL_CONTENT: "Partial Content",
  PAYMENT_REQUIRED: "Payment Required",
  PERMANENT_REDIRECT: "Permanent Redirect",
  PRECONDITION_FAILED: "Precondition Failed",
  PRECONDITION_REQUIRED: "Precondition Required",
  PROCESSING: "Processing",
  PROXY_AUTHENTICATION_REQUIRED: "Proxy Authentication Required",
  REQUEST_HEADER_FIELDS_TOO_LARGE: "Request Header Fields Too Large",
  REQUEST_TIMEOUT: "Request Timeout",
  REQUEST_TOO_LONG: "Request Entity Too Large",
  REQUEST_URI_TOO_LONG: "Request-URI Too Long",
  REQUESTED_RANGE_NOT_SATISFIABLE: "Requested Range Not Satisfiable",
  RESET_CONTENT: "Reset Content",
  SEE_OTHER: "See Other",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  SWITCHING_PROTOCOLS: "Switching Protocols",
  TEMPORARY_REDIRECT: "Temporary Redirect",
  TOO_MANY_REQUESTS: "Too Many Requests",
  UNAUTHORIZED: "Unauthorized",
  UNAVAILABLE_FOR_LEGAL_REASONS: "Unavailable For Legal Reasons",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
  USE_PROXY: "Use Proxy",
  MISDIRECTED_REQUEST: "Misdirected Request",
  SECURITY_BREACH: "Security Breach Detected",
};
