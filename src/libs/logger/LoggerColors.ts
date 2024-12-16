/* eslint-disable indent */
import chalk from 'chalk';

export const color = {
  get black() {
    // return chalk.rgb(30, 32, 27);
    return chalk.hex('#090300');
  },
  get red() {
    // return chalk.bold.hex('#ff5555');
    return chalk.hex('#F22F46');
  },
  get green() {
    // return chalk.bold.hex('#08ff83');
    return chalk.hex('#01a252');
  },
  get yellow() {
    return chalk.hex('#ffb900');
    // return chalk.hex('#fded02');
  },
  get blue() {
    return chalk.hex('#01a0e4');
  },
  get magenta() {
    return chalk.hex('#ff0883');
  },
  get cyan() {
    return chalk.hex('#b5e4f4');
  },
  get white() {
    // return chalk.bold.rgb(235, 239, 245);
    return chalk.hex('#a5a2a2');
  },
  get purple() {
    return chalk.hex('#a16a94');
  },
};

// winston log levels
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

export const getLogColorByLevel = (level: string) =>
  level === 'error'
    ? color.red
    : level === 'warn'
    ? color.yellow
    : level === 'info'
    ? color.blue
    : level === 'http'
    ? color.cyan
    : level === 'debug'
    ? color.purple
    : color.green;
