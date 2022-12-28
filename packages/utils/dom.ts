/**
 * 绑定事件
 */
export const on = (function () {
    if (document && (document as Document).addEventListener) {
        return (element: HTMLElement | Document, event: any, handler: any) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return (element: any, event: string, handler: any) => {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
/**
 * 关闭绑定
 */
export const off = (function () {
    if (document && (document as Document).removeEventListener) {
        return function (element: Document | HTMLElement, event: any, handler: any) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element: any, event: string, handler: any) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
