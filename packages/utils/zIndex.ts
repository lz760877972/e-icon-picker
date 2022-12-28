import {computed, ComputedRef, ref} from 'vue';
import {useGlobalConfig} from "./config";
import type { Ref } from 'vue'

export declare class ZIndex {
    initialZIndex: Ref<number>;
    currentZIndex: ComputedRef<number>;

    nextZIndex(): Ref<number>;
}


const zIndex = ref(0);

export const useZIndex = (): ZIndex => {
    const initialZIndex = ref(useGlobalConfig('zIndex', 3000));
    const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
    const nextZIndex = () => {
        zIndex.value++;
        return currentZIndex.value;
    };

    return {
        initialZIndex,
        currentZIndex,
        nextZIndex,
    };
};
