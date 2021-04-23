import EIconPicker from './eIconPicker/index.js';
import EIcon from './eIcon/index.js';

// import {ElInput, ElPopover, ElScrollbar} from 'element-plus';
import ElInput from 'element-plus/lib/el-input';
import ElPopover from 'element-plus/lib/el-popover';
import ElScrollbar from 'element-plus/lib/el-scrollbar';
import {version} from "../package.json";
import iconList, {eIconList, elementUI, fontAwesome} from './iconList';
import {analyzingIconForIconfont, eIconSymbol} from "./utils";

const install = function (Vue, options = {}) {
    options = {
        addIconList: options.addIconList || [],
        removeIconList: options.removeIconList || [],
        FontAwesome: options.FontAwesome || false,
        ElementUI: options.ElementUI || false,
        eIcon: options.eIcon || false,
        eIconSymbol: options.eIconSymbol || false,
    };

    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
    if (options.FontAwesome !== false) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI !== false) {
        iconList.addIcon(elementUI);
    }
    if (options.eIcon !== false) {
        if (options.eIconSymbol) {
            let list = eIconList.map(item => {
                return item.replace("eiconfont ", "#");
            });
            iconList.addIcon(list);
        } else {
            iconList.addIcon(eIconList);
        }
    }

    Vue.use(ElInput);
    Vue.use(ElPopover);
    Vue.use(ElScrollbar);
    Vue.component(EIconPicker.name, EIconPicker);
    Vue.component(EIcon.name, EIcon);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    version,
    EIconPicker,
    EIcon,
    iconList,
    elementUI,
    fontAwesome,
    eIconList,
    analyzingIconForIconfont,
    eIconSymbol
}
export default {
    install
}

