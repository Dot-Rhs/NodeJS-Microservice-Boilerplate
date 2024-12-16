import { Application } from 'express';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import BaseRoutesConfig from '../../abstractions/baseRoutes.config';

export default class UsersRoutes extends BaseRoutesConfig {
  constructor(express: Application) {
    super(express, 'UsersRoutes', '/api/users');
  }

  protected register(express: Application) {
    express.use(this.basePath, this.router);

    this.router
      .route('/')
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser,
      );

    this.router.param('userId', UsersMiddleware.extractUserId);

    this.router
      .route('/:userId')
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.router.put('/:userId', [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ]);

    this.router.patch('/:userId', [UsersMiddleware.validatePatchEmail, UsersController.patch]);
  }
}
