import {isServer} from "./util";

if (!isServer) {
    (function (e, d, w) {
        if (!e.composedPath) {
            e.composedPath = function () {
                if ((this as any).path) {
                    return (this as any).path;
                }
                let target = this.target;

                (this as any).path = [];
                while ((target as any).parentNode !== null) {
                    (this as any).path.push(target);
                    target = (target as any).parentNode;
                }
                (this as any).path.push(d, w);
                return (this as any).path;
            }
        }
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
            }
        }
    })(Event.prototype, document, window);
}
export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export * from "./util";
export * from "./dom";
export * from "./TypeUtil";
