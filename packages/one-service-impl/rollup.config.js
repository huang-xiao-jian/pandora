const path = require('path');

module.exports = async () => {
  const { default: typescript } = await import('rollup-plugin-ts');
  const { nodeExternals } = await import('rollup-plugin-node-externals');
  const { nodeResolve } = await import('@rollup/plugin-node-resolve');

  /**
   * @type {import("rollup").RollupOptions}
   */
  const options = {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      dir: path.resolve(__dirname, 'lib'),
    },
    plugins: [
      nodeExternals({
        devDeps: true,
      }),
      nodeResolve(),
      typescript({
        transpiler: 'swc',
        swcConfig: path.resolve(__dirname, '.swcrc'),
      }),
    ],
  };
  return options;
};
