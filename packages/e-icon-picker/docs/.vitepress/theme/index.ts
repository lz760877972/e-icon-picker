import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import {registerComponents} from './register-components.js';
import DefaultTheme from 'vitepress/theme'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx)
        registerComponents(ctx.app)
    }
}
