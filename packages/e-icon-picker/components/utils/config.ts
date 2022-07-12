import iconList, {eIconList, elementUI, fontAwesome} from "../js/iconList";

export let options: any = {
    addIconList: [],
    removeIconList: [],
    FontAwesome: false,
    ElementUI: false,
    eIcon: false,
    eIconSymbol: false,
    zIndex: 3000,
}

export const useGlobalConfig = (option: string, defaultValue: any): any => {
    return options[option] ? options[option] : defaultValue
}
export const setConfig = (op: any): any => {
    options = {...options, ...op}
    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
    if (options.FontAwesome) {
        iconList.addIcon(fontAwesome);
    }

    if (options.ElementUI) {
        iconList.addIcon(elementUI);
    }
    if (options.eIcon) {
        if (options.eIconSymbol) {
            let list = eIconList.map(item => {
                return item.replace("eiconfont ", "#");
            });
            iconList.addIcon(list);
        } else {
            iconList.addIcon(eIconList);
        }
    }
}
