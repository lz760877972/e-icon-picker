import type {App} from 'vue';
import eThumb from './e-thumb.vue';

export {eThumb};

export default {
    install(app: App): void {
        app.component(eThumb.name, eThumb);
    }
};
