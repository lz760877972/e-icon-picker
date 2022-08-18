import iconList from "../js/iconList";

type Options = {
    addIconList: [],
    removeIconList: [],
    zIndex: 3000,
}
export let options: Options = {
    addIconList: [],
    removeIconList: [],
    zIndex: 3000,
}

export function useGlobalConfig<K extends keyof Options>(option: K, defaultValue: any): any {
    return options[option] || defaultValue
}

export const setConfig = (op: Options): any => {
    options = {...options, ...op}
    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
}
