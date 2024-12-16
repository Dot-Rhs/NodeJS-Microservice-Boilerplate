import Express from 'express';
import { Query, Send } from 'express-serve-static-core';

// (req: TypedRequest<{ id: string }, { name: string }>, res: Express.Response)
export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

// (req: TypedRequestQuery<{ id: string }>, res: Express.Response)
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}

// (_req: Express.Request, res: TypedResponse<{ Pong: string }>)
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export interface TypedResponseLocals<T> extends Express.Response {
  locals: T;
}
