export const Environments = {
  LOCAL: 'local',
  PRODUCTION: 'production',
  DEV: 'dev',
  TEST: 'test',
  QA: 'qa',
  STAGING: 'staging',
} as const;

export const EnvironmentFile = {
  LOCAL: '.env',
  PRODUCTION: '.env.prod',
  DEV: '.env',
  TEST: '.env.test',
  QA: '.env.stag',
  STAGING: '.env.stag',
} as const;
