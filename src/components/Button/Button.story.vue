<script setup>
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import Button from './Button.vue'

import '../../assets/css/main.css'

// Reactive state for interactive controls
const state = reactive({
  text: 'Interactive Button',
  variant: 'primary',
  disabled: false,
})

const variantOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Danger', value: 'danger' },
]

</script>

<docs lang="md">
# Button Component

A reusable button component styled with Tailwind CSS utility classes based on theme variables.
It wraps the Reka UI `Primitive` component rendered as a `&lt;button&gt;` for accessibility benefits.

**Props:**
- `variant`: ('primary' | 'secondary' | 'danger' | 'default') - Sets the visual style. Default: 'default'.
- `disabled`: (boolean) - Disables button interaction and applies disabled styles. Default: false.

**Events:**
- `click`: Emitted when the button is clicked (and not disabled).

**Slots:**
- `default`: Content to be displayed inside the button (text, icons, etc.).
</docs>

<template>
  <Story title="Components/Button" icon="carbon:button">
    <Variant title="Variants">
      <div class="variant-grid">
        <Button @click="logEvent('click default', $event)">Default</Button>
        <Button variant="primary" @click="logEvent('click primary', $event)">Primary</Button>
        <Button variant="secondary" @click="logEvent('click secondary', $event)">Secondary</Button>
        <Button variant="danger" @click="logEvent('click danger', $event)">Danger</Button>
        <Button variant="primary" :disabled="true" @click="logEvent('click disabled', $event)">Disabled Primary</Button>
        <Button variant="secondary" :disabled="true" @click="logEvent('click disabled', $event)">Disabled Secondary</Button>
      </div>
    </Variant>

    <Variant title="With Different Content">
       <Button @click="logEvent('click emoji', $event)">
          <span role="img" aria-label="so cool">😎</span> So cool
       </Button>
       <Button variant="primary" @click="logEvent('click icon', $event)">
          <span>🚀 Launch</span>
       </Button>
    </Variant>

    <Variant title="Interactive Controls" icon="carbon:interactive">
      <Button
        :variant="state.variant"
        :disabled="state.disabled"
        @click="logEvent('click interactive', $event)"
      >
        {{ state.text }}
      </Button>

      <template #controls>
        <HstText v-model="state.text" title="Button Text" />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="variantOptions"
        />
        <HstCheckbox v-model="state.disabled" title="Disabled" />
      </template>
    </Variant>

  </Story>
</template>

<style scoped>
.variant-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Use gap for spacing */
  align-items: center;
}

/* Ensure buttons in the "With Different Content" variant also have spacing */
.htw-variant[title="With Different Content"] > .htw-sandbox > .htw-story-view > button {
    margin-right: 10px;
    margin-bottom: 10px;
}

/* Style the interactive button example */
.htw-variant[title="Interactive Controls"] > .htw-sandbox > .htw-story-view > button {
    margin-bottom: 20px; /* Add space below button before controls */
}

</style> 