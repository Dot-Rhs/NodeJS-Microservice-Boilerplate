import { AddressInfo } from 'net';
import http from 'http';
import { isErrnoException } from './libs';
import { color } from './libs/logger';
import processExceptionHandler from './middleware/handleProcessException';
import { initiateGlobalProperties } from './global';

/**
 * NOTE: register nodejs process error handler */
processExceptionHandler();

/**
 * NOTE: load CONFIGURATION and set ALL Global properties */
const env = initiateGlobalProperties();

/**
 * NOTE: Load rest of the SERVER dependecies*/
import App from './App';
import { name as mservice } from '../package.json';
const app: App = new App();
let server: http.Server;

app
  .init()
  .then(() => {
    app.express.set('port', env.port);
    app.express.enable('trust proxy');

    server = app.httpServer; // http.createServer(App);
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(env.port);
    return;
  })
  .catch((err: Error) => {
    global.logger.info('app.init error');
    global.logger.error(err.name);
    global.logger.error(err.message);
    global.logger.error(err.stack);
    process.exit(1);
  });

function serverError(error: unknown): void {
  if (isErrnoException(error) && error.syscall !== 'listen') {
    throw error;
  }

  // TODO: handle specific error codes here.
  throw error;
}

function serverListening(): void {
  const addressInfo: AddressInfo = <AddressInfo>server.address();
  global.logger.info(
    color.green(`
      ################################################
      🛡️  Bootup ${color.purple(env.getCurrentEnvironment().toUpperCase())} server 🛡️
      🌐  ${addressInfo.address}:${env.port} 🌐
      🟢  ${mservice} is ready for work 🟢
      ################################################
  `),
  );
}
