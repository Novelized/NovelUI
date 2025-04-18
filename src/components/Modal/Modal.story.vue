<script setup>
import { ref, reactive } from 'vue'
import Modal from './Modal.vue'
import Button from '../Button/Button.vue'
import { logEvent } from 'histoire/client'

// Import global CSS for variables
import '../../assets/css/main.css'

const interactiveState = reactive({
  isOpen: false,
  showOverlay: false,
})

</script>

<docs lang="md">
# Modal Component

A reusable modal dialog component using Reka UI Dialog primitives and the custom `BorderWrapper` for styling.

**Props:**
- `v-model:open`: (boolean) Controls the open/closed state of the modal.
- `title`: (string, optional) - Text for the modal header. Can be overridden by the `#title` slot.
- `hideCloseButton`: (boolean, optional) - Hides the default 'X' close button if true. Default: `false`.
- `showOverlay`: (boolean, optional) - Hides the background overlay if false. Default: `true`.
- `wrapperClass`: (string | string[] | object, optional) - Classes applied to the internal `BorderWrapper` for custom sizing/styling.

**Slots:**
- `#trigger`: Contains the element (usually a button) that opens the modal.
- `#default`: The main content body of the modal.
- `#title`: Custom content for the modal title area (overrides `title` prop).
- `#footer`: Content area at the bottom, typically for action buttons.
</docs>

<template>
  <Story title="Components/Modal" icon="carbon:modal">
    <!-- Add some background content to see overlay effect -->
    <div style="min-height: 110vh; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px); padding: 20px;">
      <h1>Background Content</h1>
      <p>Scroll down to see the modal overlay cover everything.</p>
    </div>

    <Variant title="Basic Usage (No Overlay Default)">
      <Modal title="Basic Modal Title" :show-overlay="false">
        <template #trigger>
          <Button variant="primary" @click="logEvent('open basic modal', $event)">Open Basic Modal</Button>
        </template>
        <p>This is the main content area of the modal.</p>
        <p>It uses the default slot and has no overlay by default.</p>
      </Modal>
    </Variant>

    <Variant title="With Footer and No Close Button">
      <Modal title="Modal with Actions" :hide-close-button="true" :show-overlay="true">
        <template #trigger>
          <Button variant="secondary" @click="logEvent('open footer modal', $event)">Open Modal with Footer</Button>
        </template>
        <p>This modal has custom actions in the footer slot and the default 'X' button is hidden.</p>
        <template #footer>
           <Button variant="secondary" @click="logEvent('click cancel', $event)">Cancel</Button>
           <Button variant="primary" @click="logEvent('click confirm', $event)">Confirm Action</Button>
        </template>
      </Modal>
    </Variant>

    <Variant title="Long Content (Scrolling)">
       <Modal title="Modal With Scrolling Content" wrapper-class="max-w-md" :show-overlay="true">
        <template #trigger>
          <Button @click="logEvent('open scrolling modal', $event)">Open Scrolling Modal</Button>
        </template>
        
        <p class="mb-4">This modal demonstrates content overflow.</p>
        <div v-for="i in 20" :key="i" class="p-2 border-b border-dashed">
          Item number {{ i }}
        </div>
        <p class="mt-4">End of scrollable content.</p>

        <template #footer>
           <Button variant="secondary" @click="logEvent('click close scroll', $event)">Close</Button> 
           <!-- Note: Reka's DialogClose works anywhere inside DialogContent -->
           <!-- <DialogClose as-child><Button variant="secondary">Close</Button></DialogClose> -->
        </template>
      </Modal>
    </Variant>

    <Variant title="With Overlay">
      <Modal title="Modal With Overlay" :show-overlay="true">
        <template #trigger>
          <Button variant="primary" @click="logEvent('open with overlay modal', $event)">Open Modal (With Overlay)</Button>
        </template>
        <p>This modal is opened with the background overlay enabled.</p>
        <p>The <code>:show-overlay="true"</code> prop is used (which is also the component's default).</p>
      </Modal>
    </Variant>

    <Variant title="Interactive Control">
      <Modal 
        title="Controlled Modal" 
        v-model:open="interactiveState.isOpen"
        :show-overlay="interactiveState.showOverlay" 
      >
         <template #trigger>
           <span class="italic text-gray-500">(Modal controlled by checkboxes below)</span>
        </template>
        <p>This modal's open state and overlay are controlled by the checkboxes in the Histoire controls panel. Overlay is off by default.</p>
      </Modal>

      <template #controls>
        <HstCheckbox v-model="interactiveState.isOpen" title="Is Modal Open" />
        <HstCheckbox v-model="interactiveState.showOverlay" title="Show Overlay" />
      </template>
    </Variant>

  </Story>
</template>

<style scoped>
/* Add spacing between variant triggers for clarity */
.histoire-variant > button,
.histoire-variant > span { /* Target the span for the interactive one */
  margin-bottom: 1rem;
  display: inline-block; /* Make span behave like button for margin */
}
</style> 