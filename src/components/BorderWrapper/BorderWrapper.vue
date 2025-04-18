<template>
    <div :class="['dialog-wrapper', wrapperClass, useDialogPadding !== false ? 'h-full' : '']">
      <div class="dialog h-full">
        <div :class="[useDialogPadding !== false ? 'dialog-content' : 'dialog-content-no-padding', 'h-full']">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    wrapperClass?: string // Optional class for the wrapper
    useDialogPadding?: boolean // Controls internal padding & height stretching
  }>();
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
  
  /* Style WITH default padding */
  .dialog-content {
    position: relative;
    overflow: hidden;
    padding: 2rem 3.5rem; /* Default large padding */
    border-radius: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.08),
      0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 300ms;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* Style WITHOUT default padding */
  .dialog-content-no-padding {
    position: relative;
    overflow: hidden;
    /* No padding here */
    border-radius: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.08),
      0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 300ms;
    flex: 1; /* Still need flex: 1 to grow */
    display: flex;
    flex-direction: column;
  }
  </style> 