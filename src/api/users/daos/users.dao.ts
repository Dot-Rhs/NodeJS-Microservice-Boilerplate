import debug from 'debug';
import { nanoid } from 'nanoid';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';
import { IPutUserDto } from '../dto/put.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  public users: ICreateUserDto[] = [];

  constructor() {
    log('Created new instance of UsersDao');
  }

  public async addUser(user: ICreateUserDto) {
    user.id = nanoid();
    this.users.push(user);
    return user.id;
  }

  public async getUsers() {
    return this.users;
  }

  public async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  public async putUserById(userId: string, user: IPutUserDto) {
    const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
  }

  public async patchUserById(userId: string, user: IPatchUserDto) {
    const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
    const currentUser = this.users[objIndex];
    const allowedPatchFields = ['password', 'firstName', 'lastName', 'permissionLevel'];
    for (const field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }

  public async removeUserById(userId: string) {
    const objIndex = this.users.findIndex((obj: { id: string }) => obj.id === userId);
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }

  public async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex((obj: { email: string }) => obj.email === email);
    const currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    }
    return null;
  }
}

export default new UsersDao();
