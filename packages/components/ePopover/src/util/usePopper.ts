import {nextTick, onBeforeUnmount, reactive, type Ref, toRefs, watch} from "vue";
import {arrow, createPopper, flip, offset, type Placement, preventOverflow} from "@popperjs/core";
import type {EPopoverEmits} from "../types";
import type {Instance} from "@popperjs/core/lib/types";

const toInt = (x: string) => parseInt(x, 10);
export default function usePopper(
    {
        arrowPadding,
        emit,
        locked,
        offsetDistance,
        offsetSkid,
        placement,
        popperNode,
        triggerNode,
    }: {
        arrowPadding: Ref<string>
        emit: EPopoverEmits
        locked: Ref<boolean>
        offsetDistance: Ref<string>
        offsetSkid: Ref<string>
        placement: Ref<Placement>
        popperNode: Ref<HTMLElement | null>
        triggerNode: Ref<HTMLElement | null>
    }
) {
    const state = reactive<{
        isOpen: boolean,
        popperInstance: Instance | null
    }>({
        isOpen: false,
        popperInstance: null,
    });

    // Enable or disable event listeners to optimize performance.
    const setPopperEventListeners = (enabled: any) => {
        state.popperInstance?.setOptions((options: any) => ({
            ...options,
            modifiers: [...options.modifiers, {name: "eventListeners", enabled}],
        }));
    };

    const enablePopperEventListeners = () => setPopperEventListeners(true);
    const disablePopperEventListeners = () => setPopperEventListeners(false);

    const close = () => {
        if (!state.isOpen) {
            return;
        }

        state.isOpen = false;
        emit("close:popper");
    };

    const open = () => {
        if (state.isOpen) {
            return;
        }

        state.isOpen = true;
        emit("open:popper");
    };

    // When isOpen or placement change
    watch([() => state.isOpen, placement], async ([isOpen]) => {
        if (isOpen) {
            await initializePopper();
            enablePopperEventListeners();
        } else {
            disablePopperEventListeners();
        }
    });

    const initializePopper = async () => {
        await nextTick();
        state.popperInstance = createPopper(triggerNode.value!, popperNode.value!, {
            placement: placement.value,
            modifiers: [
                preventOverflow,
                flip,
                {
                    name: "flip",
                    enabled: !locked.value,
                },
                arrow,
                {
                    name: "arrow",
                    options: {
                        padding: toInt(arrowPadding.value),
                    },
                },
                offset,
                {
                    name: "offset",
                    options: {
                        offset: [toInt(offsetSkid.value), toInt(offsetDistance.value)],
                    },
                },
            ],
        });

        // Update its position
        state.popperInstance?.update();
    };

    onBeforeUnmount(() => {
        state.popperInstance?.destroy();
    });

    return {
        ...toRefs(state),
        open,
        close,
    };
}
