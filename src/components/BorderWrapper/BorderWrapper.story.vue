<script setup>
import BorderWrapper from './BorderWrapper.vue'
import '../../assets/css/main.css'

</script>

<docs lang="md">
# Border Wrapper

Provides a consistent styled container with a distinctive layered border, shadow, and blur effect.
Often used to wrap sections or cards for a floating appearance.

**Structure:**
- **Outer Div (`.dialog-wrapper`)**: Controls overall width/position via `wrapperClass`.
- **Middle Div (`.dialog`)**: Applies outer border, large radius, padding, `backdrop-filter`, and subtle outer shadow.
- **Inner Div (`.dialog-content` / `.dialog-content-no-padding`)**: Applies inner border, smaller radius, main drop shadow, and background color (`--card`). Contains the slot content.

**Props:**
- `wrapperClass`: (string | string[] | object, optional) - Classes applied to the outermost wrapper for layout.
- `useDialogPadding`: (boolean, optional) - If `true` (default), applies large internal padding to the inner content div. If `false`, the inner content div has no padding, allowing slotted content to manage its own padding.
</docs>

<template>
  <Story title="Components/BorderWrapper" icon="carbon:container-software">
    <Variant title="Default Padding">
      <BorderWrapper wrapper-class="w-full max-w-lg mx-auto">
        <h3 class="font-semibold text-lg mb-2">Content Area</h3>
        <p>
          This content is inside the BorderWrapper using the default
          <code>useDialogPadding: true</code>. Notice the large internal padding
          applied by the component's styles.
        </p>
      </BorderWrapper>
    </Variant>

    <Variant title="No Padding (useDialogPadding: false)">
      <BorderWrapper :use-dialog-padding="false" wrapper-class="w-full max-w-lg mx-auto">
        <!-- Inner div provides its own padding -->
        <div class="p-4 bg-blue-100 border border-blue-300 rounded">
          <h3 class="font-semibold text-lg mb-2">Content Area</h3>
          <p>
            This content is inside the BorderWrapper with
            <code>useDialogPadding: false</code>. The wrapper provides no internal
            padding, allowing this blue box (with its own padding) to go closer
            to the wrapper's inner border.
          </p>
        </div>
      </BorderWrapper>
    </Variant>

     <Variant title="Wrapping a Card (No Padding)">
      <BorderWrapper :use-dialog-padding="false" wrapper-class="w-full max-w-xs mx-auto">
         <!-- Example: Simulating the UserProfileCard structure -->
         <div class="flex items-center justify-between px-3 py-1.5">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-gray-300"></div>
              <div>
                <div class="text-sm font-semibold">User Name</div>
                <div class="text-xs text-gray-500">Status</div>
              </div>
            </div>
            <button class="p-1 rounded hover:bg-gray-100">
              <!-- Placeholder for icon -->
              <span>⚙️</span>
            </button>
          </div>
      </BorderWrapper>
    </Variant>

  </Story>
</template>

<style scoped>
/* Add spacing between variants for clarity */
.histoire-variant {
  margin-bottom: 2rem;
}
</style> 