const { default: esbuild } = require('rollup-plugin-esbuild');
const { dts } = require('rollup-plugin-dts');
const packageJson = require('./package.json');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
    ],
    plugins: [esbuild()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.types,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
