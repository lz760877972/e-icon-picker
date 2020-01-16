import IconPicker from './e-icon-picker';
import './css/common.css';
import iconList, {elementUI, fontAwesome} from './iconList';

const install = function (Vue, options = {FontAwesome: true, ElementUI: true, IconList: []}) {
    if (options.iconList !== undefined && options.iconList && options.iconList.length > 0) {
        iconList.addIcon(options.IconList);
    }
    if (options.FontAwesome === true) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI === true) {
        iconList.addIcon(elementUI);
    }
    Vue.component(IconPicker.name, IconPicker);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {IconPicker}

export default {
    version: '0.0.5',
    IconPicker,
    install: install,
    iconPicker: IconPicker
}

