<script setup lang="ts">
import { reactive, computed } from 'vue';
import { isNotValidPassword, type ValidPassword } from './helpers/isValidForm';

const signupForm = reactive({
  username: '',
  email: '',
  passwordField: '',
  repeatedPasswordField: ''
});

const isButtonDisabled = computed(() => {
  const { passwordField, repeatedPasswordField } = signupForm;

  return isNotValidPassword(passwordField as ValidPassword, repeatedPasswordField as ValidPassword);
});

function handleChangeUsername(e: Event) {
  signupForm.username = (e.target as HTMLInputElement).value;
}

function handleChangeEmail(e: Event) {
  signupForm.email = (e.target as HTMLInputElement).value;
}

function handleChangePassword(e: Event) {
  signupForm.passwordField = (e.target as HTMLInputElement).value;
}

function handleChangePasswordRepeat(e: Event) {
  signupForm.repeatedPasswordField = (e.target as HTMLInputElement).value;
}
</script>

<template>
  <h1>Sign Up</h1>

  <div>
    <label for="username">Username</label>
    <input type="text" id="username" @input="handleChangeUsername" />
  </div>

  <div>
    <label for="email">E-mail</label>
    <input type="text" id="email" @input="handleChangeEmail" />
  </div>

  <div>
    <label for="password">Password</label>
    <input type="password" id="password" v-model="signupForm.passwordField" />
  </div>

  <div>
    <label for="password-repeat">Password Repeat</label>
    <input type="password" id="password-repeat" v-model="signupForm.repeatedPasswordField" />
  </div>

  <button :disabled="isButtonDisabled">Sign up</button>
</template>

<style></style>
