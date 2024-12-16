import { NextFunction, Response } from 'express';
import { ISearchUtteranceContext as IContext, ISearchUtteranceParams as IParams } from './types';
import { TypedRequest } from '../../types/express.interface';

class MiddlewareClass {
  async extractQueryParams(req: TypedRequest<IParams, { context: IContext }>, _res: Response, next: NextFunction) {
    const { q = '', fuzzy, offset, limit, sortBy, order } = req.query;

    const params: IContext['options'] = {
      offset: Number(offset || '0'),
      limit: Number(limit || '10'),
      sortBy: sortBy || 'itt',
      ascending: Number(order) === 1 ? true : false,
    };

    req.body.context = {
      queryString: q,
      useFuzzy: fuzzy === 'true' ? true : false,
      options: { ...params },
    };
    next();
  }
}

export default new MiddlewareClass();
