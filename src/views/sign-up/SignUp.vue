<script setup lang="ts">
import { ref } from 'vue';

const isButtonDisabled = ref(true);
const passwordField = ref('');
const repeatedPasswordField = ref('');

function handleChangePassword(e: Event) {
  passwordField.value = (e.target as HTMLInputElement).value;

  isButtonDisabled.value = passwordField.value !== repeatedPasswordField.value;
}

function handleChangePasswordRepeat(e: Event) {
  repeatedPasswordField.value = (e.target as HTMLInputElement).value;
  isButtonDisabled.value = passwordField.value !== repeatedPasswordField.value;

}
</script>

<template>
  <h1>Sign Up</h1>

  <div>
    <label for="username">Username</label>
    <input type="text" id="username" />
  </div>

  <div>
    <label for="email">E-mail</label>
    <input type="text" id="email" />
  </div>

  <div>
    <label for="password">Password</label>
    <input type="password" id="password" @input="handleChangePassword" />
  </div>

  <div>
    <label for="password-repeat">Password Repeat</label>
    <input type="password-repeat" id="password-repeat" @input="handleChangePasswordRepeat" />
  </div>

  <button :disabled="isButtonDisabled">Sign up</button>
</template>

<style></style>
