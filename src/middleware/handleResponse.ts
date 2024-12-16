import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { encrypt } from '../libs/crypto';

function send(res: Response): void {
  let obj = res.locals.data;

  if (global.environment.isProductionEnvironment()) {
    global.logger.info(JSON.stringify(obj, null, 2));
  }

  if (global.environment.applyEncryption) {
    obj = encrypt(JSON.stringify(obj), global.environment.secretKey);
  }
  res.status(StatusCodes.OK).send(obj);
}

function json(res: Response): void {
  let obj = res.locals.data;
  if (global.environment.isProductionEnvironment()) {
    global.logger.info(JSON.stringify(obj, null, 2));
  }
  if (global.environment.applyEncryption) {
    obj = encrypt(JSON.stringify(obj), global.environment.secretKey);
  }
  res.status(StatusCodes.OK).json(obj);
}

export { send, json };
