/* eslint-disable indent */
import { existsSync, mkdirSync } from 'fs';
import { createLogger, format, Logger, transports } from 'winston';
import { color, getLogColorByLevel } from './LoggerColors';
import pkg from '../../../package.json';

const isProd = process.env.NODE_ENV === 'production';
const stripColor = process.env.LOG_REMOVE_COLOR;
const logLevel = isProd ? 'info' : process.env.LOG_LEVEL || 'silly';
const logDir = process.env.LOG_PATH_DIRECTORY || './logs';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Ignore log messages if they have { private: true }
const ignorePrivate = format(info => {
  if (info.private && isProd) {
    return false;
  }
  return info;
});

const skipErrors = format(info => {
  return info.level === 'error' ? false : info;
});

const keepHttpOnly = format(info => {
  // eslint-disable-next-line no-console
  return info.level === 'http' ? info : false;
});

const customLogMessage = format.printf(info => {
  const { timestamp, level, message, service, ...args } = info;
  const colorize = getLogColorByLevel(level);
  const hasInfo = !!Object.keys(args).length;
  const ts = timestamp.slice(0, 19).replace('T', ' '); // ISO Date Format
  // eslint-disable-next-line no-console
  // console.log(new Date(Date.now()).toUTCString(), timestamp);
  return stripColor
    ? `${ts} ${service} | ${level.toUpperCase()} | ${message} ${hasInfo ? '\n' + JSON.stringify(args) : ''}`
    : [
        color.white(`${ts} ${service} |`),
        colorize(level.toUpperCase()),
        color.white('|'),
        message,
        ...(hasInfo ? [`\n${colorize(JSON.stringify(args))}`] : []),
      ].join(' ');
});

const fileTransport = [
  new transports.File({
    filename: `logs/${pkg.name}-error.log`,
    level: 'error',
    maxsize: 5242880 /* 5MB */,
    maxFiles: 14,
    format: format.uncolorize(),
  }),
  new transports.File({
    level: 'http',
    filename: `logs/${pkg.name}-http.log`,
    format: format.combine(keepHttpOnly(), format.uncolorize(), format.json()),
    maxsize: 5242880 /* 5MB */,
    maxFiles: 14,
  }),
  new transports.File({
    filename: `logs/${pkg.name}-info.log`,
    format: format.combine(skipErrors(), format.uncolorize(), format.prettyPrint()),
    maxsize: 5242880 /* 5MB */,
    maxFiles: 14,
  }),
];

const consoleTransport = [new transports.Console({ stderrLevels: ['error', 'debug'], format: customLogMessage })];

const logger: Logger = createLogger({
  level: logLevel,
  defaultMeta: { service: `${pkg.name}:${pkg.version}` },
  format: format.combine(
    format.timestamp(/* { format: 'DD-MM-YYYY HH:mm:ss' } */),
    format.errors({ stack: true }),
    format.splat(), // String interpolation splat for `%d %s` -style messages.
    format.json(), // stringify json
    ignorePrivate(),
  ),
  transports: [...fileTransport, ...consoleTransport],
});

export default logger;
