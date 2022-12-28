import {iconList} from "./iconList";

export type Options = {
    /**
     * 增加的图标
     */
    addIconList: string[];
    /**
     * 删除的图标
     */
    removeIconList: string[];
    /**
     * z-index
     */
    zIndex: number;
};
export let options: Options = {
    addIconList: [],
    removeIconList: [],
    zIndex: 3000,
};

/**
 * 获取全局配置
 * @param key 配置key
 * @param defaultValue 默认值
 */
export function useGlobalConfig<K extends keyof Options>(key: K, defaultValue?: any): any {
    return options[key] || defaultValue;
}

/**
 * 设置全局配置
 * @param option 配置信息
 */
export const setConfig = (option: Options): void => {
    options = {...options, ...option};
    if (options.addIconList !== undefined && options.addIconList && options.addIconList.length > 0) {
        iconList.addIcon(options.addIconList);
    }

    if (options.removeIconList !== undefined && options.removeIconList && options.removeIconList.length > 0) {
        iconList.removeIcon(options.removeIconList);
    }
};
