import {isString,} from '@vue/shared'
import {InjectionKey} from "vue";

export {isBoolean, isObject} from '@vueuse/core'
export const isNumber = (val: any) => typeof val === "number";

export function addUnit(value?: string | number, defaultUnit = 'px') {
    if (!value) return ''
    if (isString(value)) {
        return value
    } else if (isNumber(value)) {
        return `${value}${defaultUnit}`
    }
    console.warn('binding value must be a string or number')
}

export const GAP = 4

export interface ScrollbarContext {
    scrollbarElement: HTMLDivElement
    wrapElement: HTMLDivElement
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
    'scrollbarContextKey'
)

export const BAR_MAP = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top',
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left',
    },
} as const
