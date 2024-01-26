import path, {resolve} from 'path';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

export default () => {
  return {
    resolve: {
      alias: [
        {find: '@public', replacement: path.resolve(__dirname, './public')},
        {find: '@docs', replacement: path.resolve(__dirname, './')}
      ],
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [
          pathResolve('.vitepress/theme/svg'),
          pathResolve('node_modules/feather-icons/dist/icons')
        ],
        symbolId: '[name]'
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
  }
}
