<script setup lang="ts">
type FormInputProps = {
  label: string;
  help: string;
};
defineProps<FormInputProps>();

const emitCustomInput = defineEmits(['customInput']);

const handleCustomInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emitCustomInput('customInput', event.target.value);
  }
};
</script>

<template>
  <div class="mb-3">
    <label class="form-label" :for="label">{{ label }}</label>
    <input type="text" :id="label" class="form-control" @input="handleCustomInput" />
    <div>{{ help }}</div>
  </div>
</template>
