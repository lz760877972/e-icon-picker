import {isArray, isString} from "../utils";

const add = (list: string[], item: string | string[]) => {
    let arr: string[] = [];
    if (item && isArray(item)) {
        arr = list.concat(item);
    } else if (item && isString(item)) {
        arr = arr.concat(list);
        if (typeof item === "string") {
            arr.push(item);
        }
    }
    return arr;
};

const remove = function (list: string[], item: string | string[]) {
    if (item && isArray(item)) {
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[j] === item[i]) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
    } else if (item && isString(item)) {
        list = list.filter((i) => i !== item);
    }
    return list;
};

export declare class IconList {
    list: Array<string>;

    addIcon(item: string | string[]): void;

    removeIcon(item: string | string[]): void;
}

export const iconList: IconList = {
    list: [],
    /**
     * 全局添加图标
     * @param item
     */
    addIcon: function (item: string | string[]): void {
        this.list = add(this.list, item);
    },
    /**
     * 全局删除
     * @param item
     */
    removeIcon: function (item: string | string[]) {
        this.list = remove(this.list, item);
    }
};
