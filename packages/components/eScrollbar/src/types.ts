export interface EScrollbarProps {
    /**
     * height
     */
    height?: string | number
    /**
     * maxHeight
     */
    maxHeight?: string | number
    /**
     * wrapStyle
     */
    wrapStyle?: Record<string, any>
    /**
     * 一直显示滚动条
     */
    always?: boolean
    /**
     * 自动设置大小，如果 container 尺寸不会发生变化，最好设置它可以优化性能
     */
    noresize?: boolean
    /**
     * minSize
     */
    minSize?: number
}


export interface EScrollbarEmits {
    /**
     * 点击事件
     * @param e
     * @param value
     */
    (e: "scroll", value: { scrollTop: number, scrollLeft: number }): void;
}