import { Application } from 'express';
import Controller from './controller';
import Middleware from './middleware';
import BaseRoutesConfig from '../../abstractions/baseRoutes.config';

export default class RouteClass extends BaseRoutesConfig {
  constructor(express: Application) {
    super(express, 'SearchRoute', '/api/search');
  }
  protected register(express: Application) {
    express.use(this.basePath, this.router);

    this.router.get('/content', Middleware.extractQueryParams, Controller.search);
  }
}
