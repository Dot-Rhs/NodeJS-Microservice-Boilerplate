import { Application } from 'express';
import SystemStatusRoute from './api/system-status/routes';
import SearchRoute from './api/search/routes';
import UsersRoutes from './api/users/users.route.config';
import BaseRoutesConfig from './abstractions/baseRoutes.config';

export default function registerRoutes(express: Application): BaseRoutesConfig[] {
  return [new SystemStatusRoute(express), new SearchRoute(express), new UsersRoutes(express)];
}
