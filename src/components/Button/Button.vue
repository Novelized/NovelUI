<!--
/**
 * @file src/components/Button/Button.vue
 * @description A reusable button component with different visual variants,
 *              styled using Tailwind CSS utility classes based on theme variables.
 *              Wraps the Reka UI Primitive component configured as a button for accessibility.
 */
-->
<template>
  <Primitive
    :as="'button'"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot /> <!-- Default slot for button content -->
  </Primitive>
</template>

<script setup>
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

/**
 * @typedef {'primary' | 'secondary' | 'danger' | 'default'} ButtonVariant
 */

/**
 * @type {{ 
 *   variant?: ButtonVariant,
 *   disabled?: boolean 
 * }}
 */
const props = defineProps({
  /**
   * The visual style variant of the button.
   * @type {import('vue').PropType<ButtonVariant>}
   * @default 'default'
   */
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'primary', 'secondary', 'danger'
    ].includes(/** @type {string} */ (value)) // Type assertion for validator
  },
  /**
   * Whether the button is interactive.
   * @type {import('vue').PropType<boolean>}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

/**
 * Computes the Tailwind CSS classes for the button based on props.
 * @returns {string[]} Array of CSS classes.
 */
const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4', 
    'py-2', 
    'text-sm', 
    'font-medium', 
    'rounded-sm', 
    'border', 
    'border-transparent', 
    'transition-colors', 
    'focus:outline-none', 
    'focus:ring-2', 
    'focus:ring-ring', 
    'focus:ring-offset-2',
    'disabled:pointer-events-none', 
    'disabled:opacity-65',
  ];

  let variantClasses = [];

  switch (props.variant) {
    case 'primary':
      variantClasses = [
        'bg-primary', 
        'text-primary-foreground', 
        'border-primary', 
        'hover:bg-[--primary-hover]', 
        'hover:border-[--primary-hover]',
        'disabled:bg-primary', 
        'disabled:border-primary',
      ];
      break;
    case 'danger':
      variantClasses = [
        'bg-destructive',
        'text-destructive-foreground',
        'border-destructive',
        'hover:bg-[--destructive-hover]',
        'hover:border-[--destructive-hover]',
        'disabled:bg-destructive',
        'disabled:border-destructive',
      ];
      break;
    case 'secondary':
    case 'default': 
    default:
      variantClasses = [
        'bg-secondary',
        'text-secondary-foreground',
        'border-border', 
        'hover:bg-[--secondary-hover]',
        'hover:border-[--secondary-hover]',
        'disabled:bg-muted',
        'disabled:text-muted-foreground',
        'disabled:border-border',
      ];
      break;
  }

  return [...baseClasses, ...variantClasses];
})

/**
 * Handles the click event from the underlying Primitive (as button)
 * and emits a 'click' event for the parent component.
 * @param {Event} event - The original click event.
 */
function handleClick(event) {
  if (!props.disabled) {
    emit('click', event)
  }
}

</script>
