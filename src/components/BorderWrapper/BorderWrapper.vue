<template>
  <div :class="['dialog-wrapper', props.wrapperClass, props.useDialogPadding ? 'h-full' : '']">
    <div class="dialog h-full">
      <!-- Apply common styles directly and conditional padding -->
      <div class="relative overflow-hidden rounded-lg bg-white border border-black/10 shadow-md transition-all duration-300 flex-1 flex flex-col h-full"
           :class="{ 'p-8 md:p-14': props.useDialogPadding }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue';

/**
 * @typedef {Object} Props
 * @property {string} [wrapperClass=''] Optional CSS class to apply to the main wrapper div.
 * @property {boolean} [useDialogPadding=true] Controls whether the default internal padding and height stretching (`h-full` on the wrapper) are applied. Set to `false` to remove padding and rely on slotted content for height.
 */

/** @type {Props} */
const props = defineProps({
  wrapperClass: {
    type: String,
    default: '',
  },
  useDialogPadding: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.dialog-wrapper {
  width: 100%;
}

.dialog {
  width: 100%;
  max-height: 100%;
  min-width: 0;
  padding: 0.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(1px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03);
  transition: all 300ms;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

</style> 