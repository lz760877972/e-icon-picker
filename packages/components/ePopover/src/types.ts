import type {Placement} from "@popperjs/core";

export interface EPopoverProps {
    /**
     * placement
     */
    placement: Placement
    /**
     * Disables automatically closing the popover when the user clicks away from it
     */
    disableClickAway?: boolean
    /**
     * Offset in pixels along the trigger element
     */
    offsetSkid?: string
    /**
     * Offset in pixels away from the trigger element
     */
    offsetDistance?: string
    /**
     * Trigger the popper on hover
     */
    hover?: boolean
    /**
     * Manually open/close the Popper, other events are ignored if this prop is set
     */
    show?: boolean
    /**
     * Disables the Popper. If it was already open, it will be closed.
     */
    disabled?: boolean
    /**
     * Open the Popper after a delay (ms).
     */
    openDelay?: number
    /**
     * Close the Popper after a delay (ms).
     */
    closeDelay?: number
    /**
     * The z-index of the Popper.
     */
    zIndex?: number
    /**
     * Display an arrow on the popper
     */
    arrow?: boolean
    /**
     * Stop arrow from reaching the edge of the popper
     */
    arrowPadding?: string
    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     */
    interactive?: boolean
    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     */
    locked?: boolean
    /**
     * If the content is just a simple string, it can be passed in as a prop
     */
    content?: string | null
    /**
     * height
     */
    height?: number
    /**
     * maxHeight
     */
    maxHeight?: number
    /**
     * width
     */
    width?: number
    /**
     * maxWidth
     */
    maxWidth?: number
    /**
     * container
     */
    container?: string
    /**
     * appendContainer
     */
    appendContainer?: boolean
    /**
     * contentClass
     */
    contentClass?: string
    /**
     * display
     */
    display?: string
}


export interface EPopoverEmits {
    /**
     * 关闭 popper
     * @param e
     */
    (e: "close:popper"): void;

    /**
     * 打开 popper
     * @param e
     */
    (e: "open:popper"): void;
}