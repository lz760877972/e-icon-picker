export interface EIconProps {
    /**
     * 图标名称
     */
    iconName: string
    /**
     * 自定义的图标前缀，例如 fa fa-xxx中的fa
     */
    className?: string
}


export interface EIconEmits {
    /**
     * 点击事件
     * @param e
     * @param value
     */
    (e: "click", value: string): void;
}