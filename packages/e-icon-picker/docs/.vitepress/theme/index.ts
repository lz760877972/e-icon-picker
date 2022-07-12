import 'vitepress-theme-demoblock/theme/styles/index.css';
// import './styles/index.scss';
import {registerComponents} from './register-components.js';
import DefaultTheme from 'vitepress/theme'
export default {
    ...DefaultTheme,
    enhanceApp({app}) {
        registerComponents(app)
    }
}
