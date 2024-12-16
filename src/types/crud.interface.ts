import { Request, Response } from 'express';

export interface ICRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<string>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: any) => Promise<string>;
}

export abstract class CrudController {
  public abstract create(req: Request, res: Response): void;
  public abstract read(req: Request, res: Response): void;
  public abstract update(req: Request, res: Response): void;
  public abstract delete(req: Request, res: Response): void;
}
