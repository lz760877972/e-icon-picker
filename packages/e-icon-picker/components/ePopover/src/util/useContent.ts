import {onBeforeUnmount, onMounted, ref, watch} from "vue";

export default function useContent(slots: any, popperNode: any, content: any) {
    let observer: any = null;
    const hasContent = ref(false);

    onMounted(() => {
        if (slots.content !== undefined || content.value) {
            hasContent.value = true;
        }

        observer = new MutationObserver(checkContent);
        observer.observe(popperNode.value, {
            childList: true,
            subtree: true,
        });
    });

    onBeforeUnmount(() => observer.disconnect());

    /**
     * Watch the content prop
     */
    watch(content, content => {
        hasContent.value = !!content;
    });

    /**
     * Check the content slot
     */
    const checkContent = () => {
        hasContent.value = !!slots.content;
    };

    return {
        hasContent,
    };
}
