import iconPicker from './e-icon-picker';
import 'font-awesome/css/font-awesome.min.css';
import './css/fontawesome.css';

const install = function (Vue) {
    Vue.component(iconPicker.name, iconPicker);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {iconPicker}

export default {
    version: '0.0.1',
    install: install,
    iconPicker: iconPicker
}

