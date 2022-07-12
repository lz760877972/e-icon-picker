import {isRef, onBeforeUnmount, onMounted, unref, watch} from "vue";

export default function useEventListener(target: any, event: any, handler: any) {
    if (isRef(target)) {
        watch(target, (value: any, oldValue: any) => {
            oldValue?.removeEventListener(event, handler);
            value?.addEventListener(event, handler);
        });
    } else {
        onMounted(() => {
            target.addEventListener(event, handler);
        });
    }

    onBeforeUnmount(() => {
        unref(target)?.removeEventListener(event, handler);
    });
}
