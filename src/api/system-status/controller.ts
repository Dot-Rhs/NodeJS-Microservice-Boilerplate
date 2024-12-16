import os from 'os';
import process from 'process';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {
  IController,
  IProcessInfoResponse,
  IResourceUsageResponse,
  IServerTimeResponse,
  ISystemInfoResponse,
} from './types';
import * as responsehandler from '../../middleware/handleResponse';
import ApiError from '../../abstractions/apiError';

/**
 * Status controller
 */
class SystemStatusController implements IController {
  public getSystemInfo(_req: Request, res: Response, next: NextFunction): void {
    try {
      const response: ISystemInfoResponse = {
        cpus: os.cpus(),
        // network: os.networkInterfaces(),
        os: {
          platform: process.platform,
          version: os.release(),
          totalMemory: os.totalmem(),
          uptime: os.uptime(),
        },
        currentUser: os.userInfo(),
      };
      res.locals.data = response;
      responsehandler.send(res);
    } catch (err) {
      next(err);
    }
  }

  public getError(_req: Request, _res: Response, next: NextFunction): void {
    try {
      throw new ApiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST, 'ApiStatusError');
    } catch (error) {
      next(error);
    }
  }

  public getServerTime(_req: Request, res: Response, next: NextFunction): void {
    try {
      const now: Date = new Date();
      const utc: Date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const time: IServerTimeResponse = {
        utc,
        date: now,
      };
      res.locals.data = time;
      responsehandler.send(res);
    } catch (error) {
      next(error);
    }
  }

  public getResourceUsage(_req: Request, res: Response, next: NextFunction): void {
    try {
      const totalMem: number = os.totalmem();
      // const memProc: NodeJS.MemoryUsage = process.memoryUsage();
      const freemMem: number = os.freemem();

      const response: IResourceUsageResponse = {
        processMemory: process.memoryUsage(),
        systemMemory: {
          free: freemMem,
          total: totalMem,
          percentFree: Math.round((freemMem / totalMem) * 100),
        },
        processCpu: process.cpuUsage(),
        systemCpu: os.cpus(),
      };

      res.locals.data = response;
      responsehandler.send(res);
    } catch (err) {
      next(err);
    }
  }

  public getProcessInfo(_req: Request, res: Response, next: NextFunction): void {
    try {
      const response: IProcessInfoResponse = {
        procCpu: process.cpuUsage(),
        memUsage: process.memoryUsage(),
        env: process.env,
        pid: process.pid,
        uptime: process.uptime(),
        applicationVersion: process.version,
        nodeDependencyVersions: process.versions,
      };
      res.locals.data = response;
      responsehandler.send(res);
    } catch (err) {
      next(err);
    }
  }
}

export default new SystemStatusController();
