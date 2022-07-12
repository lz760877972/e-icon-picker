import type {App} from 'vue';
import eArrow from './e-arrow.vue';

export {eArrow};

export default {
    install(app: App): void {
        app.component(eArrow.name, eArrow);
    }
};
