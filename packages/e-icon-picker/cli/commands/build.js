const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const {defineConfig, build} = require('vite');
const vue = require('@vitejs/plugin-vue');
const dts = require('vite-plugin-dts')
const banner = require('vite-plugin-banner')

const entryDir = path.resolve(__dirname, '../../components');
const outputDir = path.resolve(__dirname, '../../lib');
const name = 'eIconPicker';// 外部引用的模块名称
const pkg = require('../../package.json')
const {getVersion, formatToLine} = require("../shared/utils");

const createBanner = () => {
  return `/**
  * ${pkg.name} v${getVersion()}
  * (c) 2019 - ${new Date().getFullYear()} ${pkg.author}
  * @license ${pkg.license}
  */`;
}

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), banner(createBanner()), dts()],
  target: 'es2018'
});

const rollupOptions = {
  external: ['vue'],
  output: {
    sourcemap: false,
    exports: "named", // 输出多个文件
    externalLiveBindings: false, // 不使用外部的LiveBindings
    globals: {
      vue: 'Vue',
    },
    assetFileNames: (chunkInfo) => {
      if (chunkInfo.name === 'style.css') return 'index.css';
      return chunkInfo.name;
    },
  },
};

const buildSingle = async (fileName) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, fileName),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: path.resolve(outputDir, fileName),
        emptyOutDir: false,
      },
    })
  );
};

const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, 'index.ts'),
          name: name,
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: outputDir,
        emptyOutDir: false,
      },
    })
  );
};


const createPackageJson = (fileName) => {
  const fileStr = `{
  "name": "${formatToLine(fileName)}",
  "version": "${getVersion()}",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "index.css"
}`;

  fsExtra.outputFile(path.resolve(outputDir, `${fileName}/package.json`), fileStr, 'utf-8').then(r => console.log('create package.json success'));
};

exports.build = async () => {

  await buildAll();
  const components = fs.readdirSync(entryDir).filter((fileName) => {
    const componentDir = path.resolve(entryDir, fileName);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
  });

  for (const fileName of components) {
    await buildSingle(fileName);
    createPackageJson(fileName);
  }
};
