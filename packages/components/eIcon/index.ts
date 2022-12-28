import type {App} from 'vue';
import eIcon from './src/e-icon.vue';

export {eIcon};
export type IconInstance = InstanceType<typeof eIcon>
export default {
    install(app: App): void {
        app.component(eIcon.name, eIcon);
    }
};
