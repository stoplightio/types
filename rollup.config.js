import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      entryFileNames: '[name].js',
      dir: 'dist',
      format: 'cjs',
    },
    {
      entryFileNames: '[name].mjs',
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [
    typescript({
      tsconfig: false,
      noEmitOnError: true,
    }),
  ],
};
