# Node-Typescript-Boilerplate

Skeleton for Node.js applications written in TypeScript

## Purpose

Our main purpose with this Skeleton is to start server application with node js and typescript.

Try it!! I am happy to hear your feedback or any kind of new features.

## Common Features

- Quick start
- Integrated eslint, prettier and husky
- Common Error Handler
- Common Response Handler
- Simple and Standard scaffolding
- Followed SOLID Principles
- Based on Typescript Syntax
- Simple Environment Configuration
- Global Environment Object
- Request/Response Encryption & Decryption Implementation
- Easily Add new feature
- Integrated winston Logger
- Production Ready Skeleton
- Followed Production Ready Best Practices: Security
- Added only used npm modules
- Unit & Integration Test Cases
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

## Core NPM Module

- [x] `express`, `@types/express`
- [x] `@types/node`
- [x] `typescript`
- [x] `dotenv`
- [x] `cors`
- [x] `helmet`
- [x] `http-status-codes`
- [x] `winston`, `@types/winston`

## Start The application in Development Mode

- Before starting make sure to create local environment `.env` file
- Install the dependencies `npm install`
- Start the application `npm start`
- Run eslint `npm run lint` & `npm run lint-fix`
- Run tests with Jest `npm run test` & `npm run test:watch` & `npm run test:custom <path/to/test/file>`
- Prettify source files `npm run pretty` & `npm run pretty:watch`
- Enable husky for precommit and prepush actions `npm run prepare`

## Start The application in Production Mode

- Install the dependencies `npm install`
- Create the build `npm run build`
- Start the application `npm run start:production`
- Before starting make sure to create prod environment `.env.prod` file

## Project Structure

| Name                         | Description                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| **wiki/**                    | You can add project documentation and instructions file here                                         |
| **src/**                     | Source files                                                                                         |
| **src/abstractions**         | Abstract classes and Interfaces                                                                      |
| **src/api**                  | REST API Components & Controllers                                                                    |
| **src/environments**         | Application Environments Handling utility                                                            |
| **src/lib**                  | Reusable utilizes and library source code like a logger                                              |
| **src/middleware/**          | Express Middleware like error handler feature                                                        |
| **src/modules/**             | Non REST API code but rather autonomous components                                                   |
| **build/**                   | Compiled source files will be placed here                                                            |
| **tests/**                   | Test cases will be placed here                                                                       |
| **tests/helpers/**           | Helpers for test cases will be placed here                                                           |
| **tests/unit-tests/**        | Unit Test cases will be placed here                                                                  |
| **tests/integration-tests/** | API routes (Integration) Test cases will be placed here                                              |
| **.vscode/**                 | Override configuration on a per project basis                                                        |
| **.editorconfig**            | Maintain consistent coding styles across various editors and IDEs                                    |
| **.eslintignore**            | Ignore specific files and directories. Precedence over the `ignorePatterns` property of config files |
| **.eslintrc.json**           | Configuration file with your eslint rules for consistency in code quality                            |
| **.gitattributes**           | Keep line ending consistent regardless of the operating system in which they are checked out         |
| **.gitignore**               | Avoid uncessary files to be pushed to Git repo                                                       |
| **.npmignore**               | Specify which files should be omitted when publishing the package to NPM                             |
| **.nvmrc**                   | Locking down node version when use `nvm use`                                                         |
| **.prettierignore**          | Ignore specific files and directories during code prettification                                     |
| **.prettierrc.json**         | Configuration file with your code beautyfication rules                                               |
| **.jest.config.json**        | Jest's configuration file                                                                            |
| **nodemon.json**             | Automatically restarting the node application when file changes                                      |
| **tsconfig.json**            | Configuration file for Typescript with ESLint and Prettier Plugins                                   |
| **tsconfig.release.json**    | Overrides default tsconfig.json with release-specific options                                        |

Note: There are two different APIs versions. The `api/search` api uses a simple approach of folder structure whereas the `api/user` uses a more structured approach that implements a Data-Access-Object(DAO) and Data-Transfer-Object(DTO) design pattern for a full RESTfull Resource.

## Workflow

![Workflow](https://github.com/santoshshinde2012/node-boilerplate/blob/master/wiki/boilerplate-workflow.png?raw=true)

## Encryption

Set the `APPLY_ENCRYPTION` environment variable to `true` to enable encryption.

## Global Environment Object

You can directly access the environment attributes in any component/file using global environment object. For more details please check file `src/global.ts`.

*Example:*

To access the `applyEncryption` attribute from `Envionment` class to Response Handler, write `environment.applyEncryption`;

## Default System Health Status API

- `${host}/api/status/system` - Return the system information in response
- `${host}/api/status/time` - Return the current time in response
- `${host}/api/status/usage` - Return the process and system memory usage in response
- `${host}/api/status/process` -  Return the process details in response
- `${host}/api/status/error` - Return the error generated object in response

## Default Search API

- `${host}/api/search/content` - Return search results from Redisearch

## Testing

Run test coverage report with `yarn test`

```sh
$npm run test:coverage

# .....
```

## Scripts

### `yarn start`

Starts the app in production by first building the project with `yarn build`, and then executing the compiled JavaScript at `build/index.js`.

### `yarn start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

### `yarn build`

Builds the app at `build`, cleaning the folder first.

### `yarn test`

Runs the `jest` tests once.

### `yarn test:watch`

Run the `jest` tests in watch mode, waiting for file changes.

### `yarn prettier`

Format your code.

### `yarn prettier:watch`

Format your code in watch mode, waiting for file changes.

### `yarn lint`

Looking your code for lint errors/warnings

### `yarn lint:fix`

Autofixes eslint errors/warnings in you code files

## Refrences

- [Skeleton for Node.js Apps written in TypeScript](https://javascript.plainenglish.io/skeleton-for-node-js-apps-written-in-typescript-444fa1695b30)
- [Setup Eslint Prettier and Husky in Node JS Typescript Project](https://gist.github.com/santoshshinde2012/e1433327e5f7a58f98fe3e6651c4d5de)
