import type {App} from 'vue';
import input from './components/eInput';
import icon from './components/eIcon';
import popover from './components/ePopover';
import scrollbar from './components/eScrollbar';
import iconPicker from './components/eIconPicker';
import './style/index.scss';
import {analyzingIconForIconfont, eIconSymbol, iconList} from "./utils";
import {Options, setConfig} from "./utils/config";
import {INSTALLED_KEY, VERSION} from "./constants";

export * from './components/eInput';
export * from './components/eIcon';
export * from './components/ePopover';
export * from './components/eScrollbar';
export * from './components/eIconPicker';

interface MyApp extends App {
    [INSTALLED_KEY]: boolean;
}


const components = [input, icon, popover, scrollbar, iconPicker];

export {
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
