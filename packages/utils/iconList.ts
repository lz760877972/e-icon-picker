import {isArray, isString, startsWith} from "lodash-es";
import {addPrefix} from "./util";

/**
 * 新增图标
 * @param list 图标列表
 * @param item 新增项
 * @param prefix 前缀
 */
const add = (list: string[], item: string | string[], prefix?: string) => {
    let arr: string[] = [];
    if (item && isArray(item)) {
        if (startsWith(item[0], "component ") && prefix) {
            item = item.map(i => addPrefix(prefix, i))
        }
        arr = list.concat(item);
    } else if (item && isString(item)) {
        arr = arr.concat(list);
        if (startsWith(item, "component ") && prefix) {
            arr.push(addPrefix(prefix, item));
        } else {
            arr.push(item);
        }
    }
    return arr;
};
/**
 * 删除图标
 * @param list 图标列表
 * @param item 删除项
 * @param prefix 前缀
 */
const remove = (list: string[], item: string | string[], prefix?: string) => {
    if (item && isArray(item)) {
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < list.length; j++) {
                let name = item[i]
                if (startsWith(name, "component ") && prefix) {
                    let split = name.split(" ");
                    name = `${split[0]} ${prefix}${split[1]}`
                }

                if (list[j] === name) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
    } else if (item && isString(item)) {
        list = list.filter((i) => {
            if (startsWith(i, "component ") && prefix) {
                let split = i.split(" ");
                i = `${split[0]} ${prefix}${split[1]}`
            }
            return i !== item;
        });
    }
    return list;
};


export declare class IconList {
    /**
     * 图标列表
     */
    list: Array<string>;

    /**
     * 全局添加图标
     * @param item 新增项
     * @param prefix 前缀
     */
    addIcon(item: string | string[], prefix?: string): void;

    /**
     * 全局删除图标
     * @param item 删除项
     * @param prefix 前缀
     */
    removeIcon(item: string | string[], prefix?: string): void;
}

/**
 * 图标列表
 */
export const iconList: IconList = {
    list: [],
    /**
     * 全局添加图标
     * @param item 新增项
     * @param prefix 前缀
     */
    addIcon: function (item: string | string[], prefix?: string): void {
        this.list = add(this.list, item, prefix);
    },
    /**
     * 全局删除图标
     * @param item 删除项
     * @param prefix 前缀
     */
    removeIcon: function (item: string | string[], prefix?: string): void {
        this.list = remove(this.list, item, prefix);
    }
};
