// @ts-nocheck
import type {App} from 'vue';
import eInput from './components/eInput';
import eIcon from './components/eIcon';
import ePopover from './components/ePopover';
import eScrollbar from './components/eScrollbar';
import eIconPicker from './components/eIconPicker';
import './style/index.scss'
import {analyzingIconForIconfont, eIconSymbol, iconList, INSTALLED_KEY} from "./utils";
import {setConfig} from "./utils/config";
import {VERSION} from "./constants"

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
    version: VERSION,
    install(app: App, options?: any): void {
        if (app[INSTALLED_KEY]) return
        app[INSTALLED_KEY] = true
        installs.forEach((p) => app.use(p as any));
        if (options) setConfig(options)
    }
};
