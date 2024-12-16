import util from 'util';
import { StatusCodes } from 'http-status-codes';
import express from 'express';
import { crypto } from '../libs';
import { color } from '../libs/logger';
import ApiError from '../abstractions/apiError';

const addErrorHandler = (
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err) {
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    global.logger.debug(
      color.purple(`REQUEST HANDLING ERROR:
        \nERROR:\n${JSON.stringify(err)}
        \nREQUEST HEADERS:\n${util.inspect(req.headers)}
        \nREQUEST PARAMS:\n${util.inspect(req.params)}
        \nREQUEST QUERY:\n${util.inspect(req.query)}
        \nBODY:\n${util.inspect(req.body)}`),
    );

    let body: any = {
      fields: err.fields,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status,
      stack: '',
    };

    // If the environment is production then no need to send error stack trace
    if (global.environment.isDevEnvironment()) {
      body.stack = err.stack;
    }
    if (global.environment.applyEncryption) {
      body = crypto.encrypt(JSON.stringify(body), global.environment.secretKey);
    }
    res.status(status).json(body);
  }
  next();
};

export default addErrorHandler;
