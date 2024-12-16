import express from 'express';
import App from '../../src/App';
import { initiateGlobalProperties } from '../../src/global';
import logger from '../../src/libs/logger';

export default class IntegrationHelpers {
  public static appInstance: express.Application;

  public static async getApp(): Promise<express.Application> {
    if (this.appInstance) {
      return this.appInstance;
    }

    initiateGlobalProperties();

    const app: App = new App();
    await app.init();
    this.appInstance = app.express;

    return this.appInstance;
  }

  public clearDatabase(): void {
    logger.info('clear the database');
  }
}
