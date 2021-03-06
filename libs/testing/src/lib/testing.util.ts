import { generateFromMetadata, getMetadata, isMockFunction, resetAllMocks } from 'jest-mock';

/**
 * Because jest runs every file in complete isolation, this only gets called once for every test in a test
 * file and therefore doesn't introduce any overhead.
 */
beforeEach(() => {
  /**
   * It is necessary to reset all mocks here, even though jest does it in the runtime as well.
   * The reason for that is importing `jest-mock` creates a new instance of the jest module mocker and doesn't
   * reuse the instance from the active test environment. It is sadly not possible to access
   * the active environment from outside of the Jest CLI.
   */
  resetAllMocks();
});

/**
 * Mocks the provided class and instantiates it.
 * If the class is already mocked, it will only be instantiated.
 *
 * Can be used to avoid the overhead of `jest.mock` on large modules and have correct types at the same time.
 *
 * @remarks
 * Mock generated by this function are not saved in the jest-runtime. They are still resetted between
 * each test, but this behavior is not influenced by the global jest config.
 */
export function instantiateMocked<T>(classToMock: new (...args: unknown[]) => T): jest.Mocked<T> {
  if (isMockFunction(classToMock)) {
    return new classToMock() as jest.Mocked<T>;
  }

  const Mock = generateFromMetadata(getMetadata(classToMock));
  return new Mock() as any;
}