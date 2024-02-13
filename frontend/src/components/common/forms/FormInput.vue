<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

type FormInputProps = {
  modelValue: string;
  label: string;
  errorMessage: string;
};

const { modelValue, label, errorMessage } = defineProps<FormInputProps>();

const emitCustomInput = defineEmits(['update:modelValue']);

const handleCustomInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emitCustomInput('update:modelValue', event.target.value);
  }
};
</script>

<template>
  <div class="mb-3">
    <label class="form-label" :for="label">{{ label }}</label>
    <input
      type="text"
      :id="label"
      class="form-control"
      :class="{ 'is-invalid': errorMessage }"
      :value="modelValue"
      @input="handleCustomInput"
    />
    <p class="invalid-feedback">{{ errorMessage }}</p>
  </div>
</template>
