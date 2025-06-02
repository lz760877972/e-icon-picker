import {defineConfig} from 'tsdown'

export default defineConfig([
  {
    entry: ['src'],
    clean: true,
    outDir: "lib",
    dts: true,
    format: ['esm'],
    // external:['types.d.ts',"web-types.d.ts"]
  },
  {
    entry: ['src/cli.ts'],
    clean: true,
    outDir: "bin",
    dts: false,
    format: ['cjs']
  },
])