<script setup lang="ts">
import logo from '~/assets/logo.svg';

const imageUrl = new URL(logo, import.meta.url).href;

const count = $ref(0);
</script>

<template>
  <img :src="imageUrl" height="45" alt="" />
  <h1>
    <slot></slot>
  </h1>
  <button type="button" @click="count++">Clicks: {{ count }}</button>
</template>

<style>
h1 {
  margin: 5px;
}

button {
  margin-top: 10px;
}
</style>
