import {startsWith} from "lodash-es";

export declare class ForIconfontGlyphs {
    icon_id: string;
    name: string;
    font_class: string;
    unicode: string;
    unicode_decimal: string;
}

export declare class ForIconfont {
    id: string;
    name: string;
    font_family: string;
    css_prefix_text: string;
    description: string;
    glyphs: Array<ForIconfontGlyphs>;
}

/**
 * 将阿里妈妈的iconfont.json文件读成想用的单色图标对象
 * @param json
 */
export const analyzingIconForIconfont = (json: ForIconfont): {
    font_family: string;
    css_prefix_text: string;
    list: Array<string>
} => {
    let font_family = '';
    let css_prefix_text = '';
    let list: Array<string> = [];
    if (json) {
        if (json.font_family) {
            font_family = json.font_family;
        }
        if (json.css_prefix_text) {
            css_prefix_text = json.css_prefix_text;
        }
        if (json.glyphs) {
            list = json.glyphs.map((value: ForIconfontGlyphs) => font_family + " " + css_prefix_text + value.font_class);
        }
    }
    return {
        font_family,
        css_prefix_text,
        list
    };
};

/**
 * 将阿里妈妈的iconfont.json文件读成想用的彩色图标对象
 * @param json
 */
export const eIconSymbol = (json: ForIconfont): { font_family: string; list: string[]; css_prefix_text: string } => {
    let font_family = '';
    let css_prefix_text = '';
    let list: Array<string> = [];
    if (json) {
        if (json.font_family) {
            font_family = json.font_family;
        }
        if (json.css_prefix_text) {
            css_prefix_text = json.css_prefix_text;
        }
        if (json.glyphs) {
            list = json.glyphs.map((value: ForIconfontGlyphs) => '#' + css_prefix_text + value.font_class);
        }
    }
    return {
        font_family,
        css_prefix_text,
        list
    };
};
/**
 * 添加前缀
 * @param prefix
 * @param item
 */
export const addPrefix = (prefix: string, item: string): string => {
    let res: string = item;
    if (startsWith(item, "component ") && prefix) {
        let split = item.split(" ");
        res = `${split[0]} ${prefix}${split[1]}`
    }
    return res;
};

/**
 * 校验是否是外部链接
 * @param {string} path 路径
 */
export const isExternal = (path: string): boolean => {
    return /^(https?:|data:|\/\/?)/.test(path);
}
