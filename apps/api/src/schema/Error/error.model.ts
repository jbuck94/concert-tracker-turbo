export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNIQUE_CONSTRAINT = 'UNIQUE_CONSTRAINT',
}

export class CustomError extends Error {
  name: ErrorType;
  message: string;
  metadata?: Record<string, any>;

  constructor({
    name,
    message,
    metadata,
  }: {
    name: ErrorType;
    message: string;
    metadata?: Record<string, any>;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.metadata = metadata;
  }
}

export class ErrorForbidden extends CustomError {
  constructor(message: string, metadata?: Record<string, any>) {
    super({
      name: ErrorType.FORBIDDEN,
      message,
      metadata,
    });
  }
}

export class ErrorNotFound extends CustomError {
  constructor(message: string, metadata?: Record<string, any>) {
    super({
      name: ErrorType.NOT_FOUND,
      message,
      metadata,
    });
  }
}

export class ErrorInvalidRequest extends CustomError {
  constructor(message: string, metadata?: Record<string, any>) {
    super({
      name: ErrorType.INVALID_REQUEST,
      message,
      metadata,
    });
  }
}

export class ErrorUniqueConstraint extends CustomError {
  constructor(message: string, metadata?: Record<string, any>) {
    super({
      name: ErrorType.UNIQUE_CONSTRAINT,
      message,
      metadata,
    });
  }
}