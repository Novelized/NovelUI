<!--
/**
 * @file src/components/Modal/Modal.vue
 * @description A reusable modal dialog component using Reka UI Dialog primitives
 *              and the custom BorderWrapper for styling.
 */
-->
<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <!-- Conditionally render overlay -->
      <DialogOverlay v-if="props.showOverlay" class="modal-overlay" />
      <!-- Positioner now has transparent background -->
      <DialogContent class="modal-content-positioner">
        <!-- BorderWrapper provides the blur/outer border -->
        <BorderWrapper :use-dialog-padding="false" :wrapper-class="['modal-dialog', wrapperClass]">
          <!-- Inner content div provides the main visual block -->
          <div class="modal-inner-content">
            <DialogTitle v-if="title || $slots.title" class="modal-title">
              <slot name="title">{{ title }}</slot>
            </DialogTitle>
            
            <DialogDescription as-child>
              <div class="modal-body">
                  <slot /> <!-- Default slot for main content -->
              </div>
            </DialogDescription>

            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer" />
            </div>

            <DialogClose v-if="!hideCloseButton" class="modal-close-button" aria-label="Close">
              <span>&times;</span> <!-- Simple X character -->
            </DialogClose>
          </div>
        </BorderWrapper>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import BorderWrapper from '../BorderWrapper/BorderWrapper.vue'

const isOpen = defineModel('open', { type: Boolean, default: false })

/**
 * @type {{
 *  title?: string,
 *  hideCloseButton?: boolean,
 *  wrapperClass?: string | string[] | Record<string, boolean>,
 *  showOverlay?: boolean,
 * }}
 */
const props = defineProps({
  /**
   * Optional title displayed at the top of the modal.
   * Can be overridden by the #title slot.
   * @type {import('vue').PropType<string>}
   * @default ''
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Set to true to hide the default 'X' close button.
   * @type {import('vue').PropType<boolean>}
   * @default false
   */
  hideCloseButton: {
    type: Boolean,
    default: false
  },
  /**
   * Optional CSS classes to apply to the BorderWrapper component inside the modal.
   * Useful for controlling max-width, etc.
   * @type {import('vue').PropType<string | string[] | Record<string, boolean>>}
   */
   wrapperClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Whether to show the semi-transparent overlay behind the modal.
   * @type {import('vue').PropType<boolean>}
   * @default true
   */
  showOverlay: {
    type: Boolean,
    default: true
  }
})

</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.6); /* Darker overlay */
  position: fixed;
  inset: 0;
  z-index: 40;
  /* Optional: Add fade-in animation */
  animation: fadeIn 0.2s ease-out;
}

.modal-content-positioner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  width: 90vw; /* Default responsive width */
  max-height: 85vh;
  outline: none;
  animation: scaleIn 0.2s ease-out;
  /* Ensure it doesn't have its own background or shadow */
  background-color: transparent;
}

/* Target BorderWrapper via class added in :wrapper-class prop */
.modal-dialog {
   /* Default max-width for modals, can be overridden by wrapperClass prop */
   max-width: 500px; 
   width: 100%;
   display: flex; /* Ensure wrapper itself uses flex */
   flex-direction: column; /* Stack content vertically */
   max-height: inherit; /* Inherit max-height from positioner */
   overflow: hidden; /* Prevent content breaking border-radius */
   /* The BorderWrapper itself handles the blur/outer border/shadow */
}

/* This inner div now provides the main content background, shadow, padding */
.modal-inner-content {
  position: relative; /* For positioning close button */
  padding: 1.5rem; /* Default padding inside the BorderWrapper */
  flex: 1; /* Allow content to take space */
  overflow-y: auto; /* Allow scrolling if content overflows */
  border-radius: 1rem; /* Matches inner radius from BorderWrapper */
  background-color: var(--card, white); 
  border: 1px solid rgba(0, 0, 0, 0.1); 
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.08),
    0 10px 15px -3px rgba(0, 0, 0, 0.1); 
}

.modal-title {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: var(--foreground, black);
  margin-bottom: 1rem;
}

.modal-body {
  color: var(--foreground, black);
  /* Add margin if both title and footer are present? */
}

.modal-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border, #eee);
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 0.5rem; /* Space between buttons */
}

.modal-close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem;
  line-height: 1;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--muted-foreground, gray);
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.modal-close-button:hover {
  color: var(--foreground, black);
  background-color: var(--accent, #f0f0f0);
}

/* Basic Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

</style> 