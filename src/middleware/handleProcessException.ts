import logger, { color } from '../libs/logger';

const handleException = function (ex: Error): void {
  logger.error('Unhandled Exception', { reason: ex.message, ex });

  process.exit(1);
};

const handleRejectedPromise = function (reason: unknown, promise: Promise<unknown>): void {
  logger.error('Unhandled Promise Rejection', { reason, ex: promise });

  process.exit(1);
};

export default function registerExceptionHandler(): void {
  logger.info(color.magenta('** Register Unhandled Exception Handlers **'));
  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
}
