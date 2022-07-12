import type {App} from 'vue';
import eIconPicker from './src/e-icon-picker.vue';

export {eIconPicker};

export default {
    install(app: App): void {
        app.component(eIconPicker.name, eIconPicker);
    }
};
