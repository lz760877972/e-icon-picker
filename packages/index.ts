import type {App} from 'vue';
import eInput from './components/eInput';
import eIcon from './components/eIcon';
import ePopover from './components/ePopover';
import eScrollbar from './components/eScrollbar';
import eIconPicker from './components/eIconPicker';
import './style/index.scss'
import {analyzingIconForIconfont, eIconSymbol, iconList, INSTALLED_KEY} from "./utils";
import {Options, setConfig} from "./utils/config";
import {VERSION} from "./constants"

interface MyApp extends App {
    [INSTALLED_KEY]: boolean
}


const components = [eInput, eIcon, ePopover, eScrollbar, eIconPicker];

export {
    eInput, eIcon, ePopover, eScrollbar, eIconPicker,
    iconList,
    analyzingIconForIconfont,
    eIconSymbol,
};

export default {
    version: VERSION,
    install(app: MyApp, options?: Options): void {
        if (app[INSTALLED_KEY]) return
        app[INSTALLED_KEY] = true
        components.forEach((component) => app.use(component));
        if (options) setConfig(options)
    }
};
