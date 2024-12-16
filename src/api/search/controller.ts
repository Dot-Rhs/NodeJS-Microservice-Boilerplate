import { NextFunction, Response } from 'express';
import Service from './service';
import { ISearchUtteranceContext } from './types';
import { TypedRequestBody } from '../../types/express.interface';

class UsersController {
  public async search(
    req: TypedRequestBody<{ context: ISearchUtteranceContext }>,
    res: Response, // TypedResponse<{ queryString: ISearchUtteranceContext['queryString'] }>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { options, queryString, useFuzzy } = req.body.context;
      const results = await Service.search(queryString, options, useFuzzy);

      res.json({ data: results });
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
