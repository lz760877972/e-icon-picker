import {nextTick, onBeforeUnmount, reactive, toRefs, watch} from "vue";
import {arrow, createPopper, flip, offset, preventOverflow} from "@popperjs/core";
import {CLOSE_POPPER_EVENT, OPEN_POPPER_EVENT} from "../../../../constants";

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
    }: any
): any {
    const state = reactive<any>({
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
        emit(CLOSE_POPPER_EVENT);
    };

    const open = () => {
        if (state.isOpen) {
            return;
        }

        state.isOpen = true;
        emit(OPEN_POPPER_EVENT);
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
        state.popperInstance = createPopper(triggerNode.value, popperNode.value, {
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
