import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import vuePlugin from 'rollup-plugin-vue'
import commonjs from "@rollup/plugin-commonjs"
import {terser} from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only' // 提取css
import pkg from '../package.json'
import {writeFileSync} from "fs";

const extensions = ['.js'];

const name = 'eIconPicker'

const createBanner = () => {
    return `/**
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * @license ${pkg.license}
  */`
}

const createBaseConfig = () => {
    return {
        input: 'src/index.js',
        external: ["vue"],
        plugins: [
            vuePlugin({
                target: 'browser',
                css: false,
                exposeFilename: false,
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: extensions,
                babelHelpers: 'bundled'
            }),
            resolve({
                extensions: ['.vue', '.js']
            }),
            css({ output(style) {
                    writeFileSync('./src/css/css.css', style)
                } }),
            commonjs(),
            json()
        ],
        output: {
            sourcemap: false,
            exports: "named", // 输出多个文件
            banner: createBanner(),
            externalLiveBindings: false,
            globals: {
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
        replace({
            __DEV__: `(process.env.NODE_ENV !== 'production')`,
            preventAssignment: true
        }),
        copy({
            targets: [
                {src: ['src/utils/getSvg.js', 'src/js/symbol.js'], dest: 'lib'}
            ]
        })
    ],
    output: {
        file: createFileName('esm-bundler'),
        format: 'es'
    }
}


// es-browser
const esBrowserConfig = {
    plugins: [
        replace({
            __DEV__: true,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('esm-browser'),
        format: 'es'
    }
}

// es-browser.prod
const esBrowserProdConfig = {
    plugins: [
        terser(),
        replace({
            __DEV__: false,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('esm-browser.prod'),
        format: 'es'
    }
}

// cjs
const cjsConfig = {
    plugins: [
        replace({
            __DEV__: true,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('cjs'),
        format: 'cjs'
    }
}
// cjs.prod
const cjsProdConfig = {
    plugins: [
        terser(),
        replace({
            __DEV__: false,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('cjs.prod'),
        format: 'cjs'
    }
}


// global
const globalConfig = {
    plugins: [
        replace({
            __DEV__: true,
            'process.env.NODE_ENV': true,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('global'),
        format: 'iife',
        name
    }
}
// global.prod
const globalProdConfig = {
    plugins: [
        terser(),
        replace({
            __DEV__: false,
            'process.env.NODE_ENV': true,
            preventAssignment: true
        })
    ],
    output: {
        file: createFileName('global.prod'),
        format: 'iife',
        name
    }
}

const prodFormatConfigs = [
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
        return mergeConfig(createBaseConfig(), formatConfig)
    })
}

export default createPackageConfigs()
