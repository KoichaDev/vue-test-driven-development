<template>
  <button data-testid="language-en-selector" @click="$i18n.locale = 'no'">
    <img src="https://flagcdn.com/16x12/no.png" alt="" />
    NO
  </button>
  <button data-testid="language-no-selector" class="m-1" @click="$i18n.locale = 'en'">
    <img src="https://flagcdn.com/16x12/gb.png" alt="" />
    EN
  </button>
</template>
