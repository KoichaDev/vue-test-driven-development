<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import axios, { AxiosError } from 'axios';
import FormInput from '@/components/common/forms/FormInput.vue';

import { isNotValidPassword, type ValidPassword } from './helpers/isValidForm';

type UsersAxiosError = AxiosError & {
  response: {
    status: 400;
    data: {
      validationErrors: {
        username: string;
        email: string;
        message?: string;
      };
    };
  };
};

const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
});

const apiInProgress = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const apiErrors = reactive({
  username: '',
  email: ''
});

const isButtonDisabled = computed(() => {
  const { password, repeatedPassword } = signupForm;

  return isNotValidPassword(password as ValidPassword, repeatedPassword as ValidPassword);
});

const handleChangeUsername = (value: string) => {
  signupForm.username = value
}

async function handleSubmitButton() {
  const { repeatedPassword: _, ...restFormFields } = signupForm;
  apiInProgress.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.post('/api/v1/users', { ...restFormFields });

    successMessage.value = response.data.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const validationErrors = error as UsersAxiosError;

      if (validationErrors.response.status === 400) {
        const dataError = validationErrors.response.data.validationErrors;
        console.log(dataError);
        apiErrors.username = dataError.username;
        apiErrors.email = dataError.email;
      } else {
        errorMessage.value = 'Unexpected error occured. Please try again!';
      }
    }
  } finally {
    apiInProgress.value = false;
  }
}
</script>

<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <h1>Sign Up</h1>
    <form
      v-if="!successMessage"
      class="card"
      data-testid="form-sign-up"
      @submit.prevent="handleSubmitButton"
    >
      <div class="card-body">
        <FormInput label="Username" :help="apiErrors.username" @custom-input="handleChangeUsername"  />
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

        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
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
