import {isServer} from "./util";

if (!isServer) {
    (function (e: any, d: Document, w: Window) {
        if (!e.composedPath && w) {
            e.composedPath = function () {
                if (this.path) {
                    return this.path;
                }
                let target: any = this.target;

                this.path = [];
                while (target.parentNode !== null) {
                    this.path.push(target);
                    target = target.parentNode;
                }
                this.path.push(d, w);
                return this.path;
            }
        }
        if (!String.prototype.startsWith) {
            Object.defineProperty(String.prototype, 'startsWith', {
                value: function (search: string, pos: number | undefined) {
                    pos = !pos || pos < 0 ? 0 : +pos;
                    return this.substring(pos, pos + search.length) === search;
                }
            });
        }
    })(Event.prototype, document, window);
}
export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export * from "./util";
export * from "./dom";
export * from "./typeUtil";
export * from "./iconList";
// export * from "./getSvg";
