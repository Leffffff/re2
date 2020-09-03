/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const buildTestInput = (filenames) => {
  return filenames.reduce((accum, filename) => {
    accum[`__tests__/${filename}.test`] = `__tests__/${filename}.test.ts`;
    return accum;
  }, {});
};

const externalModules = ['chalk', 'path', 'url', 'fs'];

const buildPlugins = [
  nodeResolve(),
  commonjs({ include: 'node_modules/**' }),
  terser(),
];

const outputOptions = {
  format: 'cjs',
  interop: 'auto',
  sourcemap: true,
  hoistTransitiveImports: false,
};

export default () => {
  const mainBuild = {
    input: {
      'scripts/re2': 'scripts/re2.ts',
      'scripts/updateBuild': 'scripts/updateBuild.ts',
    },
    external: externalModules,
    output: {
      ...outputOptions,
      dir: 'lib',
    },
    plugins: [
      ...buildPlugins,
      typescript({ outDir: 'lib', exclude: '__tests__/**/*.ts' }),
      replace({
        "resolve(__dirname, '../../bin/re2Lib')":
          "resolve(__dirname, '../../bin/re2Lib.cjs')",
        delimiters: ['', ''],
      }),
    ],
  };

  const testBuild = {
    // Specify filenames in __tests__ folder using array
    input: buildTestInput(['check', 'exec', 'replace']),
    external: externalModules,
    output: {
      ...outputOptions,
      dir: 'lib/__tests__',
      chunkFileNames: '[name].js',
      entryFileNames: '[name].js',
      sourcemap: false,
    },
    plugins: [
      ...buildPlugins,
      typescript({ outDir: 'lib/__tests__', declaration: false }),
    ],
  };

  return [mainBuild, testBuild];
};
