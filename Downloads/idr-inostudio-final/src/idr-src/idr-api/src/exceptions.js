/* eslint-disable no-param-reassign */
class Exception extends Error {
  constructor(msg, name, code, className, data) {
    msg = msg || 'Error';

    let errors;
    let message;
    let newData;

    if (msg instanceof Error) {
      message = msg.message || 'Error';

      // NOTE: This is typically to handle validation errors
      if (msg.errors) {
        errors = msg.errors;
      }
    } else if (typeof msg === 'object') { // Support plain old objects
      message = msg.message || 'Error';
      data = msg;
    } else { // message is just a string
      message = msg;
    }

    if (data) {
      // To make sure that we are not messing
      // with immutable data, just make a copy.
      newData = Object.assign({}, data);

      if (newData.errors) {
        errors = newData.errors;
        delete newData.errors;
      }
    }

    super(message);

    // NOTE: Babel doesn't support this so
    // we have to pass in the class name manually.
    // this.name = this.constructor.name;
    this.type = 'Exception';
    this.name = name;
    this.message = message;
    this.code = code;
    this.className = className;
    this.data = newData;
    this.errors = errors || {};
  }

  // NOTE: A little hack to get around `message` not
  // being included in the default toJSON call.
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      className: this.className,
      data: this.data,
      errors: this.errors,
    };
  }
}

class BadRequest extends Exception {
  constructor(message, data) {
    super(message, 'BadRequest', 400, 'bad-request', data);
  }
}

class NotAuthenticated extends Exception {
  constructor(message, data) {
    super(message, 'NotAuthenticated', 401, 'not-authenticated', data);
  }
}

class PaymentError extends Exception {
  constructor(message, data) {
    super(message, 'PaymentError', 402, 'payment-error', data);
  }
}

class Forbidden extends Exception {
  constructor(message, data) {
    super(message, 'Forbidden', 403, 'forbidden', data);
  }
}

class NotFound extends Exception {
  constructor(message, data) {
    super(message, 'NotFound', 404, 'not-found', data);
  }
}

class MethodNotAllowed extends Exception {
  constructor(message, data) {
    super(message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
  }
}

class NotAcceptable extends Exception {
  constructor(message, data) {
    super(message, 'NotAcceptable', 406, 'not-acceptable', data);
  }
}

class Timeout extends Exception {
  constructor(message, data) {
    super(message, 'Timeout', 408, 'timeout', data);
  }
}

class Conflict extends Exception {
  constructor(message, data) {
    super(message, 'Conflict', 409, 'conflict', data);
  }
}

class LengthRequired extends Exception {
  constructor(message, data) {
    super(message, 'LengthRequired', 411, 'length-required', data);
  }
}

class Unprocessable extends Exception {
  constructor(message, data) {
    super(message, 'Unprocessable', 422, 'unprocessable', data);
  }
}

class TooManyRequests extends Exception {
  constructor(message, data) {
    super(message, 'TooManyRequests', 429, 'too-many-requests', data);
  }
}

class GeneralError extends Exception {
  constructor(message, data) {
    super(message, 'GeneralError', 500, 'general-error', data);
  }
}

class NotImplemented extends Exception {
  constructor(message, data) {
    super(message, 'NotImplemented', 501, 'not-implemented', data);
  }
}

class BadGateway extends Exception {
  constructor(message, data) {
    super(message, 'BadGateway', 502, 'bad-gateway', data);
  }
}

class Unavailable extends Exception {
  constructor(message, data) {
    super(message, 'Unavailable', 503, 'unavailable', data);
  }
}

const errors = {
  Exception,
  BadRequest,
  NotAuthenticated,
  PaymentError,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  Timeout,
  Conflict,
  LengthRequired,
  Unprocessable,
  TooManyRequests,
  GeneralError,
  NotImplemented,
  BadGateway,
  Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable,
};

function convert(error) {
  if (!error) {
    return error;
  }

  const RaiseException = errors[error.name];
  const result = RaiseException ? new RaiseException(error.message, error.data)
    : new Error(error.message || error);

  if (typeof error === 'object') {
    Object.assign(result, error);
  }

  return result;
}

export default Object.assign({
  convert,
  types: errors,
  errors,
}, errors);
