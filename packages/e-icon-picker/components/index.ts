import type {App} from 'vue';
import eInput from './eInput';
import eIcon from './eIcon';
import ePopover from './ePopover';
import eScrollbar from './eScrollbar';
import eIconPicker from './eIconPicker';
import './style/index.scss'
import {analyzingIconForIconfont, eIconSymbol} from "./utils";
import iconList, {eIconList, elementUI, fontAwesome} from './js/iconList';

const installs = [
    eInput, eIcon, ePopover, eScrollbar, eIconPicker
];
export {
    eInput, eIcon, ePopover, eScrollbar, eIconPicker,

    iconList,
    elementUI,
    fontAwesome,
    eIconList,
    analyzingIconForIconfont,
    eIconSymbol,
};
export default {
    version: "1.0.0-rc.0",
    install(app: App): void {
        installs.forEach((p) => app.use(p as any));
    }
};
