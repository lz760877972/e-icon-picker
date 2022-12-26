import {computed, ref} from 'vue';
import {useGlobalConfig} from "./config";

const zIndex = ref(0);

export const useZIndex = (): any => {
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
