<script setup lang="ts">
import { reactive, computed } from 'vue';
import axios from 'axios';

import { isNotValidPassword, type ValidPassword } from './helpers/isValidForm';

const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
});

const isButtonDisabled = computed(() => {
  const { password, repeatedPassword } = signupForm;

  return isNotValidPassword(password as ValidPassword, repeatedPassword as ValidPassword);
});

function handleSubmitButton() {
  const { repeatedPassword: _, ...restFormFields } = signupForm;

  axios.post('/api/v1/users', { ...restFormFields });
}
</script>

<template>
  <h1>Sign Up</h1>

  <form>
    <div>
      <label for="username">Username</label>
      <input type="text" id="username" v-model="signupForm.username" />
    </div>
    <div>
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="signupForm.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="signupForm.password" />
    </div>
    <div>
      <label for="password-repeat">Password Repeat</label>
      <input type="password" id="password-repeat" v-model="signupForm.repeatedPassword" />
    </div>
    <button @click.prevent="handleSubmitButton" :disabled="isButtonDisabled">Sign up</button>
  </form>
</template>

<style></style>
