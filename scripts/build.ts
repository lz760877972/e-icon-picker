import path from "path"
import fsExtra from "fs-extra"
import {build, defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import pkg from "../package.json"
import {success} from "./shared/logger"
import {formatToLine, getVersion} from "./shared/utils"

const name = 'eIconPicker';// 外部引用的模块名称
const entryDir = path.resolve(__dirname, '../packages');
const outputDir = path.resolve(__dirname, '../lib');


const createBanner = () => {
    return `/**
  * e-icon-picker v${getVersion()}
  * (c) 2019 - ${new Date().getFullYear()} ${pkg.author}
  * @license ${pkg.license}
  */
`;
}
const bannerPlugin: any = {
    name: 'banner',
    enforce: 'post',
    generateBundle(options: any, bundle: any[]) {
        const banner = createBanner()
        const footer = ''

        for (const module of Object.values(bundle)) {
            if (module.type === 'chunk') {
                module.code = banner + module.code + footer
            }
        }
    }
}
const baseConfig: any = defineConfig({
    publicDir: false,
    plugins: [vue(), bannerPlugin],
});

const rollupOptions: any = {
    external: ['vue'],
    output: {
        sourcemap: false,
        exports: "named", // 输出多个文件
        externalLiveBindings: false, // 不使用外部的LiveBindings
        globals: {
            vue: 'Vue',
        },
        assetFileNames: (chunkInfo: any) => {
            if (chunkInfo.name === 'style.css') return 'index.css';
            return chunkInfo.name;
        },
    }
};

const buildSingle = (fileName: string) => {
    build(
        defineConfig({
            ...baseConfig,
            plugins: [...baseConfig.plugins],
            build: {
                rollupOptions,
                lib: {
                    entry: path.resolve(entryDir, "components", fileName),
                    name: fileName,
                    fileName: 'index',
                    formats: ['es', 'umd'],
                },
                outDir: path.resolve(outputDir, "components", fileName),
                emptyOutDir: false
            },
        }) as any
    );
};

const buildAll = async () => {
    await build(
        defineConfig({
            ...baseConfig,
            plugins: [...baseConfig.plugins, dts({
                entryRoot: path.resolve(entryDir),
                outDir: outputDir,
                include: "packages",
                exclude: "packages/default-icon",
                copyDtsFiles: false
            })],
            build: {
                rollupOptions,
                lib: {
                    entry: path.resolve(entryDir, 'index.ts'),
                    name: name,
                    fileName: 'index',
                    formats: ['es', 'umd', 'cjs', 'iife'],
                },
                outDir: outputDir,
                emptyOutDir: false
            },
        }) as any
    );
};


const createPackageJson = async (fileName: string) => {
    const fileStr = `{
  "name": "@e-icon-picker/${formatToLine(fileName)}",
  "version": "${getVersion()}",
  "main": "index.umd.js",
  "module": "index.mjs",
  "style": "index.css"
}`;

    await fsExtra.outputFile(path.resolve(outputDir, `components/${fileName}/package.json`), fileStr, 'utf-8').then(() => success(`create ${fileName}/package.json success`));
};

const buildComponents = async () => {
    buildAll();//编译主组件
    //编译子组件
    const components = fsExtra.readdirSync(path.resolve(entryDir, "components")).filter((fileName) => {
        const componentDir = path.resolve(entryDir, "components", fileName);
        const isDir = fsExtra.lstatSync(componentDir).isDirectory();
        return isDir && fsExtra.readdirSync(componentDir).includes('index.ts');
    });
    for (const fileName of components) {
        await buildSingle(fileName);
        await createPackageJson(fileName);
    }
};
buildComponents()
