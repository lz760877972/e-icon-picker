import path from 'path';
import {defineConfig} from 'vite';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

export default defineConfig({
    resolve: {
        alias: [
            {find: '@public', replacement: path.resolve(__dirname, './public')},
            {find: '@docs', replacement: path.resolve(__dirname, './')}
        ],
    },
    plugins: [
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), '.vitepress/theme/svg')],
            // 指定symbolId格式
            symbolId: '[name]',
            svgoOptions: {
                // @ts-ignore
                plugins: [{
                    name: "removeAttrs",
                    params: {
                        attrs: "(fill|stroke)"
                    }
                }]
            }
        })
    ],
    optimizeDeps: {
        exclude: ['vue-router'],
    },
    server: {
        fs: {
            strict: false,
        },
    },
    css: {
        preprocessorOptions: {scss: {charset: false}}
    }
});
