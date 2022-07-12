import type {App} from 'vue';
import ePopover from './src/e-popover.vue';

export {ePopover};

export default {
    install(app: App): void {
        app.component(ePopover.name, ePopover);
    }
};
