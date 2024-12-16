import Environment from '../../../src/environments';

describe('Environment', () => {
  let instance: Environment;
  const env = process.env.NODE_ENV;

  beforeEach(() => {
    instance = new Environment();
  });

  it('should get the current environment', async () => {
    expect(instance).toBeInstanceOf(Environment);
    const environment = instance.getCurrentEnvironment();
    expect(environment).toBeDefined();
    expect(environment).toBe(env);
  });

  it('should check if environement is production or not', async () => {
    const result = instance.isProductionEnvironment();
    expect(result).toBe(false);
  });

  it('should set the current environment', async () => {
    instance.setEnvironment('local');
    const environment = instance.getCurrentEnvironment();
    expect(environment).toBeDefined();
    expect(environment).toBe(env);
  });
});
