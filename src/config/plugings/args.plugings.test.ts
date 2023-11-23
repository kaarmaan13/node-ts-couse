// import { yarg } from "./args.plugings"

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('./args.plugings')

  return yarg
}

describe('Test args.plugin.ts', () => {

  const originalArgv = process.argv

  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '8','-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir'])
    expect(argv).toEqual(expect.objectContaining({
      b: 8,
      l: 20,
      s: true,
      n: 'custom-name',
      d: 'custom-dir'
    }))
  })
})