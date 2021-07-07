<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>高级使用</h2>
    <e-icon-picker v-model="icon" :options="options" :disabled="disabled" :readonly="readonly"
                   :placement="placement" :styles="style" :width="width"/>
    名称： {{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "example2",
  setup() {
    let icon = ref("");
    let options = ref({FontAwesome: false, ElementUI: true, addIconList: [], removeIconList: []});
    let disabled = ref(false);
    let readonly = ref(false);
    let placement = ref("bottom");
    let style = ref({});
    let width = ref(800);

    return {
      icon,
      options,
      disabled,
      readonly,
      placement,
      style,
      width
    }
  }
})
</script>

<style scoped>

</style>
