import type {App} from 'vue';
import eScrollbar from './src/e-scrollbar.vue';

export {eScrollbar};
export type ScrollbarInstance = InstanceType<typeof eScrollbar>
export default {
    install(app: App): void {
        app.component(eScrollbar.name, eScrollbar);
    }
};
