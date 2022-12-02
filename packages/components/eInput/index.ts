import type {App} from 'vue';
import eInput from './src/e-input.vue';

export {eInput};

export default {
  install(app: App): void {
    app.component(eInput.name, eInput);
  }
};
