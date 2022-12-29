import type {App} from 'vue';
import eScrollbar from './src/e-scrollbar.vue';

export * from './src/eBar'
export * from './src/eThumb'
export {eScrollbar};
export type ScrollbarInstance = InstanceType<typeof eScrollbar>
export default {
    install(app: App): void {
        app.component(eScrollbar.name, eScrollbar);
    }
};
