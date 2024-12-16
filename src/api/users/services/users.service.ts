/* eslint-disable @typescript-eslint/no-explicit-any */

import debug from 'debug';
import UsersDao from '../daos/users.dao';
import { ICRUD } from '../../../types/crud.interface';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPutUserDto } from '../dto/put.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:users-services');

class UsersService implements ICRUD {
  public async create(resource: ICreateUserDto) {
    return UsersDao.addUser(resource);
  }

  public async deleteById(id: string) {
    return UsersDao.removeUserById(id);
  }

  public async list(limit: number, page: number) {
    log(`limit:${limit} / page:${page}`);
    return UsersDao.getUsers();
  }

  public async patchById(id: string, resource: IPatchUserDto): Promise<any> {
    return UsersDao.patchUserById(id, resource);
  }

  public async putById(id: string, resource: IPutUserDto): Promise<any> {
    return UsersDao.putUserById(id, resource);
  }

  public async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  public async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }
}

export default new UsersService();
