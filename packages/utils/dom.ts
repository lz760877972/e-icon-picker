import {isClient} from "./util";

export const on = (function () {
    if (isClient) {
        if (document && (document as Document).addEventListener) {
            return (element: HTMLElement, event: any, handler: any) => {
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
    }
})();
export const off = (function () {
    if (isClient) {
        if (document && (document as Document).removeEventListener) {
            return function (element: HTMLElement, event: any, handler: any) {
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
    }
})();
