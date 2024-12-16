import { Application, Router } from 'express';

export default abstract class BaseRoutesConfig {
  protected readonly name: string;
  protected readonly basePath: string;

  protected readonly router: Router;

  protected constructor(express: Application, name: string, basePath: string) {
    this.name = name;
    this.basePath = basePath;
    this.router = Router();
    this.register(express);
  }

  public getName(): string {
    return this.name;
  }

  public getBasePath(): string {
    return this.basePath;
  }

  protected abstract register(express: Application): void;
}
