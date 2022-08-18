import {TypeUtil} from "../utils";
import eIconList from "./eIconList";
import elementUI from "./elementUI";
import fontAwesome from "./fontAwesome";

const add = function (list: string[], item: string | string[]) {
    let arr: string[] = [];
    if (item && TypeUtil.isArray(item)) {
        arr = list.concat(item);
    } else if (item && TypeUtil.isString(item)) {
        arr = arr.concat(list);
        if (typeof item === "string") {
            arr.push(item);
        }
    }
    return arr;
};

const remove = function (list: string[], item: string | string[]) {
    if (item && TypeUtil.isArray(item)) {
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[j] === item[i]) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
    } else if (item && TypeUtil.isString(item)) {
        list = list.filter((i) => i !== item)
    }
    return list;
};

const iconList: {
    list: Array<string>,
    addIcon: Function,
    removeIcon: Function
} = {
    list: [],
    /**
     * 全局添加图标
     * @param item
     */
    addIcon: function (item: string | string[]) {
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

export {fontAwesome, elementUI, eIconList}
export default iconList
