import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import vuePlugin from 'rollup-plugin-vue'
import commonjs from "@rollup/plugin-commonjs"
import {terser} from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only' // 提取css
import filesize from 'rollup-plugin-filesize'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import pkg from '../package.json'
import {writeFileSync} from "fs";

const extensions = ['.js'];

const name = 'eIconPicker'//外部引用的模块名

const createBanner = () => {
    return `/**
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * @license ${pkg.license}
  */`
}

const createBaseConfig = (minify) => {
    return {
        input: 'src/index.js',
        external: ["vue"],//排除列表
        plugins: [
            vuePlugin({
                target: 'browser',
                css: false,
                exposeFilename: false,
            }),
            esbuild({
                minify,
                sourceMap: minify,
                target: 'es2018',
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: extensions,
                babelHelpers: 'bundled'
            }),
            resolve({
                extensions: ['.vue', '.js']
            }),
            css({
                output(style) {
                    writeFileSync('./src/css/css.css', style)
                }
            }),
            commonjs(),
            json(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),

                // options
                preventAssignment: true,
            }),
            filesize()
        ],
        output: {
            sourcemap: false,
            exports: "named", // 输出多个文件
            banner: createBanner(),
            externalLiveBindings: false,
            globals: {//外部依赖
                vue: 'Vue'
            }
        }
    }
}

function mergeConfig(baseConfig, configB) {
    const config = Object.assign({}, baseConfig)
    // plugin
    if (configB.plugins) {
        baseConfig.plugins.push(...configB.plugins)
    }

    // output
    config.output = Object.assign({}, baseConfig.output, configB.output)

    return config
}


function createFileName(formatName) {
    return `./lib/index.${formatName}.js`
}

// es-bundler
const esBundleConfig = {
    plugins: [
        copy({
            targets: [
                {src: ['src/utils/getSvg.js', 'src/js/symbol.js'], dest: 'lib'}
            ]
        })
    ],
    output: {
        file: createFileName('esm-bundler'),
        format: 'esm'//输出的文件类型 (amd, cjs, esm, iife, umd)
    }
}

const umdConfig = {
    output: {
        file: createFileName('umd'),
        format: 'umd',
        name: name
    },
}
const umdProdConfig = {
    plugins: [
        terser()
    ],
    output: {
        file: createFileName('umd.prod'),
        format: 'umd',
        name: name
    },
}
// es-browser
const esBrowserConfig = {
    plugins: [],
    output: {
        file: createFileName('esm-browser'),
        format: 'esm'
    }
}

// es-browser.prod
const esBrowserProdConfig = {
    plugins: [
        terser()
    ],
    output: {
        file: createFileName('esm-browser.prod'),
        format: 'esm'
    }
}

// cjs
const cjsConfig = {
    plugins: [],
    output: {
        file: createFileName('cjs'),
        format: 'cjs'
    }
}
// cjs.prod
const cjsProdConfig = {
    plugins: [
        terser()
    ],
    output: {
        file: createFileName('cjs.prod'),
        format: 'cjs'
    }
}


// global
const globalConfig = {
    plugins: [],
    output: {
        file: createFileName('global'),
        format: 'iife',
        name: name
    }
}
// global.prod
const globalProdConfig = {
    plugins: [
        terser()
    ],
    output: {
        file: createFileName('global.prod'),
        format: 'iife',
        name: name
    }
}

const prodFormatConfigs = [
    umdConfig,
    umdProdConfig,
    esBundleConfig,
    esBrowserProdConfig,
    esBrowserConfig,
    cjsConfig,
    cjsProdConfig,
    globalConfig,
    globalProdConfig
]

const devFormatConfigs = [esBundleConfig]

function getFormatConfigs() {
    return process.env.NODE_ENV === 'development'
        ? devFormatConfigs
        : prodFormatConfigs
}

function createPackageConfigs() {
    return getFormatConfigs().map((formatConfig) => {
        return mergeConfig(createBaseConfig(false), formatConfig)
    })
}

export default createPackageConfigs()
