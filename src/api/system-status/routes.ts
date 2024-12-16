import { Application } from 'express';
import controller from './controller';
import BaseRoutesConfig from '../../abstractions/baseRoutes.config';

export default class RouteClass extends BaseRoutesConfig {
  constructor(express: Application) {
    super(express, 'SystemStatus', '/api/status');
  }

  protected register(express: Application) {
    express.use(this.basePath, this.router);
    this.router.get('/system', controller.getSystemInfo);
    this.router.get('/time', controller.getServerTime);
    this.router.get('/usage', controller.getResourceUsage);
    this.router.get('/process', controller.getProcessInfo);
    this.router.get('/error', controller.getError);
  }
}
