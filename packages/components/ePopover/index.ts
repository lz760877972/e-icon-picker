import type {App} from 'vue';
import ePopover from './src/e-popover.vue';

export * from './src/eArrow';
export {ePopover};
export type PopoverInstance = InstanceType<typeof ePopover>;
export default {
    install(app: App): void {
        app.component(ePopover.name, ePopover);
    }
};
