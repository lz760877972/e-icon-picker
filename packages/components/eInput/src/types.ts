import type {StyleValue} from "vue";
import type {ComponentSize} from "../../../constants";

export interface EInputProps {
    /**
     * 前缀图标名称
     */
    prefixIcon?: string
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 只读
     */
    readonly?: boolean
    /**
     * placeholder
     */
    placeholder?: string
    /**
     * 输入框样式
     */
    style?: StyleValue
    /**
     *  输入框可清空
     */
    clearable?: boolean
    /**
     * 输入框绑定值
     */
    modelValue: string
    /**
     *  输入框尺寸
     */
    size: ComponentSize
}


export interface EInputEmits {
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