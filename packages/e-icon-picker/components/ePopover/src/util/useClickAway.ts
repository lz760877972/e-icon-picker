import {unref} from "vue";
import useEventListener from "./useEventListeners";

export default function useClickAway(target: any, handler: any) {
    const event = "pointerdown";

    if (typeof window === 'undefined' || !window) {
        return;
    }

    const listener = (event: any) => {
        const el = unref(target);
        if (!el) {
            return;
        }

        if (el === event.target || event.composedPath().includes(el)) {
            return;
        }

        handler(event);
    };

    return useEventListener(window, event, listener);
}
