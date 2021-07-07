import EIconPicker from './eIconPicker/index.js';
import EIcon from './eIcon/index.js';

// import {ElInput, ElPopover, ElScrollbar} from 'element-plus';
// import ElInput from 'element-plus/lib/el-input';
// import ElPopover from 'element-plus/lib/el-popover';
// import ElScrollbar from 'element-plus/lib/el-scrollbar';
import {setConfig} from "element-plus/es/utils/config.js";
import {version} from "../package.json";
import iconList, {eIconList, elementUI, fontAwesome} from './js/iconList';
import {analyzingIconForIconfont, eIconSymbol} from "./utils";

const install = function (Vue, options = {}) {
    if (install.installed) {
        console.warn("e-icon-picker 已经安装")
        return;
    }
    options = {
        addIconList: options.addIconList || [],
        removeIconList: options.removeIconList || [],
        FontAwesome: options.FontAwesome || false,
        ElementUI: options.ElementUI || false,
        eIcon: options.eIcon || false,
        eIconSymbol: options.eIconSymbol || false,
        zIndex: options.zIndex || 3000,
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

    // Vue.use(ElInput);
    // Vue.use(ElPopover);
    // Vue.use(ElScrollbar);
    Vue.component(EIconPicker.name, EIconPicker);
    Vue.component(EIcon.name, EIcon);
    // Vue.prototype.$EICON = {
    //     zIndex: options.zIndex
    // };
    // Vue.config.globalProperties.$EICON = {
    //     zIndex: options.zIndex
    // };
    setConfig({
        zIndex: options.zIndex
    });
    install.installed = true;
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

