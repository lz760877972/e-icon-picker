// @ts-nocheck
import type {App} from 'vue';
import eInput from './eInput';
import eIcon from './eIcon';
import ePopover from './ePopover';
import eScrollbar from './eScrollbar';
import eIconPicker from './eIconPicker';
import './style/index.scss'
import {analyzingIconForIconfont, eIconSymbol, iconList, INSTALLED_KEY} from "./utils";
import {setConfig} from "./utils/config";

const installs = [
    eInput, eIcon, ePopover, eScrollbar, eIconPicker
];
export {
    eInput, eIcon, ePopover, eScrollbar, eIconPicker,
    iconList,
    analyzingIconForIconfont,
    eIconSymbol,
};
export default {
    version: "1.0.0-rc.0",
    install(app: App, options?: any): void {
        if (app[INSTALLED_KEY]) return
        app[INSTALLED_KEY] = true
        installs.forEach((p) => app.use(p as any));
        if (options) setConfig(options)
    }
};
