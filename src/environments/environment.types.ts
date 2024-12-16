import { Environments } from './environment.constant';
import { Values } from '../libs/typedUtils';

// Dynamic Type. When `Enviroments` changes this will
// automatically get updated. So, no maintainance needed here
export type EnvValues = Values<typeof Environments>;

export interface IEnvironment {
  port: number;
  secretKey: string;
  applyEncryption: boolean;
  getCurrentEnvironment(): string;
  setEnvironment(env: string): void;
  isProductionEnvironment(): boolean;
  isDevEnvironment(): boolean;
  isTestEnvironment(): boolean;
  isStagingEnvironment(): boolean;
}
