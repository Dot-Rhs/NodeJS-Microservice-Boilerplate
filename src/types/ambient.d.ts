import { IEnvironment } from '../environments/environment.types';
import { Logger } from 'winston';

/**
 * Declaring global variables for `node@16` and above
 * see https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js
 * As of `node@16` the `NodeJS.Global` interface has been removed in favor of `globalThis`.
 *
 * NOTE:
 * - variable must be declared as `var`. `let` or `const` variables doesn't show up on `globalThis`.
 * - Without the `export {}`, all variables will become `any`
 *
 * Test from the terminal:
 * - `tsc -b -v`
 * - `node -r ts-node/register/transpile-only src/server.ts`
 */
declare global {
  var environment: Environment;
  var logger: Logger;
}

export {};

// Modifying the global variables for another module
// import 'express';
// declare global {
//   namespace Express {
//     interface Request {
//       token: string;
//       UserID: string;
//     }
//   }
// }
