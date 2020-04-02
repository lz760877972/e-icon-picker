import EIconPicker from './e-icon-picker';
import './css/common.css';
import iconList, {elementUI, fontAwesome} from './iconList';

export * from './utils';

const install = function (Vue, options = {FontAwesome: true, ElementUI: true, addIconList: [], removeIconList: []}) {
    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
    if (options.FontAwesome === true) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI === true) {
        iconList.addIcon(elementUI);
    }
    Vue.component(EIconPicker.name, EIconPicker);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export {
    EIconPicker,
    iconList,
    elementUI,
    fontAwesome
}
export default {
    version: '1.0.4',
    install,
    EIconPicker
}

