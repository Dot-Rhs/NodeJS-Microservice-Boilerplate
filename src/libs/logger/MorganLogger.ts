/* eslint-disable max-len */
import morgan from 'morgan';
import logger from './Logger';

const isProd = process.env.NODE_ENV === 'production';

morgan.token('message', (_req, res: any) => {
  return res.locals.errorMessage || '';
});

const getIpFormat = () => (isProd ? ':remote-addr - ' : '');
const errorResponseFormat = `${getIpFormat()}:method :url :status :res[content-length] - :response-time ms - message: :message`;
const successResponseFormat = `${getIpFormat()}:method :url :status :res[content-length] - :response-time ms`;
// const successResponseFormat =
//   '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}';

export const morganMiddlewareSuccess = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: message => logger.http(message.trim()) },
});

export const morganMiddlewareError = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: message => logger.error(message.trim()) },
});

export const morganMiddlewareLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    // Configure Morgan to use our custom logger with the http severity
    write: message => logger.http(message.trim()),
  },
});
