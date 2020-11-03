import Vue from 'vue'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface EIconPickerOptions {
    addIconList: string[],
    removeIconList: string[],
    FontAwesome: boolean,
    ElementUI: boolean,
    eIcon: boolean,
    eIconSymbol: boolean,
}

/** EIconPicker Component */
export declare class EIconPicker extends Vue {
    /** Install component into Vue */
    static install(vue: typeof Vue): void

    /** 是否禁用 */
    disabled: boolean;

    /**只读 */
    readonly: boolean;

    /** 可清空 */
    clearable: boolean;

    /** 样式 */
    styles: {};

    /** 弹出框位置 */
    placement: PopoverPlacement;

    /** 默认值 */
    value: string;

    /** 组件相关参数*/
    options: EIconPickerOptions;

    /** 宽度 */
    width: number;

    /** 输入框尺寸 */
    size: string
}
