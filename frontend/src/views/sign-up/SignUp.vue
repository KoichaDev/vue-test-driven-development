<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import axios from 'axios';

import { isNotValidPassword, type ValidPassword } from './helpers/isValidForm';

const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
});

const apiInProgress = ref(false);
const successMessage = ref('');

const isButtonDisabled = computed(() => {
  const { password, repeatedPassword } = signupForm;

  return isNotValidPassword(password as ValidPassword, repeatedPassword as ValidPassword);
});

async function handleSubmitButton() {
  const { repeatedPassword: _, ...restFormFields } = signupForm;
  apiInProgress.value = true;
  const response = await axios.post('/api/v1/users', { ...restFormFields });

  successMessage.value = response.data.message;
}
</script>

<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <h1>Sign Up</h1>
    <form class="card" @submit.prevent="handleSubmitButton">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input type="text" id="username" class="form-control" v-model="signupForm.username" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="email">E-mail</label>
          <input type="text" id="email" class="form-control" v-model="signupForm.email" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input type="password" id="password" class="form-control" v-model="signupForm.password" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password-repeat">Password Repeat</label>
          <input
            type="password"
            id="password-repeat"
            class="form-control"
            v-model="signupForm.repeatedPassword"
          />
        </div>
        <div class="text-center">
          <button class="btn btn-primary" :disabled="isButtonDisabled || apiInProgress">
            <span v-if="apiInProgress" role="status" class="spinner-border spinner-border-sm">
            </span>
            Sign up
          </button>
        </div>
      </div>
    </form>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
  </div>
</template>

<style></style>
