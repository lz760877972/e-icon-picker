import type {StyleValue} from "vue";
import type {Placement} from "@popperjs/core";

export type EIconPickerPlacement = Exclude<Placement, "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end" | 'left' | 'right'>

export type EIconPickerSize = "default" | "small" | "large";

export class Options {
    addIconList?: Array<string>;
    removeIconList?: Array<string>;
}

export interface EIconPickerProps {
    /**
     * 是否禁用文本框
     */
    disabled?: boolean
    /**
     * 只读
     */
    readonly?: boolean
    /**
     * 可清空
     */
    clearable?: boolean
    /**
     * 自定义样式
     */
    styles?: StyleValue
    /**
     * 弹出框位置
     */
    placement?: EIconPickerPlacement
    /**
     * 绑定值
     */
    modelValue: string
    /**
     * 参数
     */
    options?: Options
    /**
     * 宽度
     */
    width?: number
    /**
     * 原生提示
     */
    placeholder?: string
    /**
     * 默认图标
     */
    defaultIcon?: string
    /**
     * 空列表显示文字
     */
    emptyText?: string
    /**
     * 高亮颜色
     */
    highLightColor?: string
    /**
     * zIndex
     */
    zIndex?: number
    /**
     * 是否追加到body
     */
    appendBody?: boolean
    /**
     * 内容自定义样式
     */
    contentClass?: string
    /**
     * 大小
     */
    size?: EIconPickerSize
}


export interface EIconPickerEmits {
    /**
     * 更新绑定值
     * @param e
     * @param value
     */
    (e: "update:modelValue", value: string): void;

    /**
     * 输入 框值改变
     * @param e
     * @param value
     */
    (e: "input", value: string): void;

    /**
     * 输入 框值改变
     * @param e
     * @param value
     */
    (e: "change", value: string): void;

    /**
     * 得到 焦点
     * @param e
     * @param value
     */
    (e: "focus", value: FocusEvent): void;

    /**
     * 失去 焦点
     * @param e
     * @param value
     */
    (e: "blur", value: FocusEvent): void;

    /**
     * 鼠标 移出
     * @param e
     * @param value
     */
    (e: "mouseleave", value: MouseEvent): void;

    /**
     * 鼠标 移入
     * @param e
     * @param value
     */
    (e: "mouseenter", value: MouseEvent): void;

    /**
     * 清空数据
     * @param e
     */
    (e: "clear"): void;
}