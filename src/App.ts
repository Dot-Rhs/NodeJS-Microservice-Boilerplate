import http from 'http';
import express from 'express';
import responseTime from 'response-time';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import addErrorHandler from './middleware/handleError';
import registerRoutes from './routes';
import BaseRoutesConfig from './abstractions/baseRoutes.config';
import { color, morganMiddlewareError, morganMiddlewareSuccess } from './libs/logger';

export default class App {
  public express!: express.Application;
  public httpServer!: http.Server;
  public routes!: BaseRoutesConfig[];

  // Initiate app
  public async init(): Promise<void> {
    this.routes = [];
    this.express = express();
    this.httpServer = http.createServer(this.express);
    await this.establishConnectionDb();
    await this.establishConnectionWebsocket();
    this.addExpressMiddlewares();
    this.addRoutes();
    this.addErrorHandler();
  }

  // Register ALL routes
  private addRoutes(): void {
    this.express.get('/', this.basePathRoute);
    this.routes = [...registerRoutes(this.express)];
    this.routes.forEach((route: BaseRoutesConfig) => {
      global.logger.info(color.purple(`[${route.getName()}] ${route.getBasePath()}`));
    });
    global.logger.info(color.magenta('** Initiating Rest API Routes **'));
  }

  // Register ALL middlewares
  private addExpressMiddlewares(): void {
    // support application/json type post data
    // support application/x-www-form-urlencoded post data
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this.express.use(helmet());
    this.express.use(json({ limit: '100mb' }));
    this.express.use(urlencoded({ limit: '100mb', extended: false }));
    this.express.use(cors());
    this.express.use(responseTime());
    this.express.use(morganMiddlewareSuccess);
    this.express.use(morganMiddlewareError);
    global.logger.info(color.magenta('** Initiating Express Middlewares **'));
  }

  private basePathRoute(_: express.Request, res: express.Response): void {
    res.json({ message: 'base path' });
  }

  private addErrorHandler(): void {
    this.express.use(addErrorHandler);
    global.logger.info(color.magenta('** Register Rest API Error Handler **'));
  }

  private async establishConnectionDb(): Promise<void> {
    global.logger.info(color.magenta('** Establish Database Connection **'));
    return Promise.resolve();
  }

  private async establishConnectionWebsocket(): Promise<void> {
    global.logger.info(color.magenta('** Establish Websocket Connection **'));
    return Promise.resolve();
  }
}
