/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const buildTestInput = (filenames) => {
  return filenames.reduce((accum, filename) => {
    accum[`__tests__/${filename}.test`] = `__tests__/${filename}.test.ts`;
    return accum;
  }, {});
};

const externalModules = ['chalk', 'module', 'path', 'url'];

const buildPlugins = [nodeResolve(), commonjs({ include: 'node_modules/**' })];

const outputOptions = {
  format: 'es',
  freeze: false,
  interop: 'auto',
  sourcemap: true,
  hoistTransitiveImports: false,
};

export default () => {
  const mainBuild = {
    input: { 'scripts/re2': 'scripts/re2.ts' },
    external: externalModules,
    output: {
      ...outputOptions,
      dir: 'lib',
    },
    plugins: [
      ...buildPlugins,
      typescript({ outDir: 'lib', exclude: '__tests__/**/*.ts' }),
      replace({
        "require('../../bin/re2Lib')": "require('../../bin/re2Lib.cjs')",
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
      format: 'es',
      dir: 'dist',
      chunkFileNames: '__tests__/[name].js',
      entryFileNames: '[name].js',
      sourcemap: false,
    },
    plugins: [
      ...buildPlugins,
      typescript({ outDir: 'dist', declaration: false }),
    ],
  };

  return [mainBuild, testBuild];
};
