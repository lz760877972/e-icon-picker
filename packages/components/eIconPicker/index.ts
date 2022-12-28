import type {App} from 'vue';
import eIconPicker from './src/e-icon-picker.vue';

export {eIconPicker};
export type IconPickerInstance = InstanceType<typeof eIconPicker>
export default {
    install(app: App): void {
        app.component(eIconPicker.name, eIconPicker);
    }
};
