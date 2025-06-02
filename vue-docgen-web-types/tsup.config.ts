import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['src/*'],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "lib",
  dts: true,
  bundle: false,
  format: ['cjs', 'esm'],
})