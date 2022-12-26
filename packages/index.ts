import type {App} from 'vue';
import input, {eInput} from './components/eInput';
import icon, {eIcon} from './components/eIcon';
import popover, {ePopover} from './components/ePopover';
import scrollbar, {eScrollbar} from './components/eScrollbar';
import iconPicker, {eIconPicker} from './components/eIconPicker';
import './style/index.scss';
import {analyzingIconForIconfont, eIconSymbol, iconList, INSTALLED_KEY} from "./utils";
import {Options, setConfig} from "./utils/config";
import {VERSION} from "./constants";

interface MyApp extends App {
    [INSTALLED_KEY]: boolean;
}


const components = [input, icon, popover, scrollbar, iconPicker];

export {
    eInput, eIcon, ePopover, eScrollbar, eIconPicker,
    iconList,
    analyzingIconForIconfont,
    eIconSymbol,
};

export default {
    version: VERSION,
    install(app: MyApp, options?: Options): void {
        if (app[INSTALLED_KEY]) {
            return;
        }
        app[INSTALLED_KEY] = true;
        components.forEach((component) => app.use(component));
        if (options) {
            setConfig(options);
        }
    }
};
