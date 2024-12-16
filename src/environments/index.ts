import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';
import { EnvironmentFile, Environments } from './environment.constant';
import { EnvValues, IEnvironment } from './environment.types';

export default class Environment implements IEnvironment {
  public port: number;

  public secretKey: string;

  public applyEncryption: boolean;

  constructor() {
    const env: EnvValues = (process.env.NODE_ENV as EnvValues) || Environments.LOCAL;
    const port: string | undefined | number = process.env.PORT || 3146;

    this.setEnvironment(env);
    this.port = Number(process.env.PORT || port);
    this.applyEncryption = String(process.env.APPLY_ENCRYPTION) === 'true';
    this.secretKey = process.env.SECRET_KEY || '';
  }

  public setEnvironment(env: EnvValues): void {
    let envPath: string;
    const rootdir: string = path.resolve(__dirname, '../../');
    switch (env) {
      case Environments.PRODUCTION:
        envPath = path.resolve(rootdir, EnvironmentFile.PRODUCTION);
        break;
      case Environments.TEST:
        envPath = path.resolve(rootdir, EnvironmentFile.TEST);
        break;
      case Environments.STAGING:
        envPath = path.resolve(rootdir, EnvironmentFile.STAGING);
        break;
      case Environments.LOCAL:
        envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
        break;
      default:
        envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
    }
    if (!fs.existsSync(envPath)) {
      throw new Error(`'${envPath.split('/').pop()}' file is missing in root directory`);
    }

    configDotenv({ path: envPath });
  }
  // TODO: Fix the typings on enviromental props. Replace the `string` with a union of valid enriomental values
  public getCurrentEnvironment(): string {
    const environment: string = process.env.NODE_ENV || Environments.LOCAL;

    switch (environment) {
      case Environments.PRODUCTION:
        return Environments.PRODUCTION;
      case Environments.DEV:
      case Environments.TEST:
      case Environments.QA:
        return Environments.TEST;
      case Environments.STAGING:
        return Environments.STAGING;
      case Environments.LOCAL:
      default:
        return Environments.LOCAL;
    }
  }

  public isProductionEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.PRODUCTION;
  }

  public isDevEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.DEV || this.getCurrentEnvironment() === Environments.LOCAL;
  }

  public isTestEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.TEST;
  }

  public isStagingEnvironment(): boolean {
    return this.getCurrentEnvironment() === Environments.STAGING;
  }
}
