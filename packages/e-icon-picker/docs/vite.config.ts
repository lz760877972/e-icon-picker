// @ts-ignore
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    resolve: {
        alias: [{find: '@e-icon-picker', replacement: path.resolve(__dirname, '../')},
            {find: '@public', replacement: path.resolve(__dirname, './public')}],
    },
    plugins: [
    ],
    optimizeDeps: {
        exclude: ['vue-router', 'lodash-es'],
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
