import type {App} from 'vue';
import eBar from './e-bar.vue';

export type eBarInstance = InstanceType<typeof eBar>

export {eBar};

export default {
    install(app: App): void {
        app.component(eBar.name, eBar);
    }
};
