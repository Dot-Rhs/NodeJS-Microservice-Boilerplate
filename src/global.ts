import Environment from './environments';
import logger, { color, ILogger } from './libs/logger';

export const setGlobalEnvironment = (environment: Environment): void => {
  logger.info(color.magenta('** Assign ".env" properties into NodeJS.Global object **'));
  global.environment = environment;
};

export const setGlobalLogger = (customLogger: ILogger): void => {
  logger.info(color.magenta('** Assign logger into NodeJS.Global object **'));
  global.logger = customLogger;
};

export function initiateGlobalProperties(): Environment {
  // Attach logger into `global` object
  setGlobalLogger(logger);

  // Bootatrap configuration
  const env: Environment = new Environment();
  setGlobalEnvironment(env);

  return env;
}
